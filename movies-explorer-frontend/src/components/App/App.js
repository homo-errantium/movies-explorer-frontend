import React, { useEffect, useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom';

import './App.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

// import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const path = location.pathname;
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorRequest, setErrorRequest] = React.useState(false);
    const [errorText, setErrorText] = React.useState(false);
    const [isProfileForm, setIsProfileForm] = useState(false);
    const [isRegForm, setIsRegForm] = useState(false);

    //Проверка токена и авторизация пользователя
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            mainApi
                .getContent(jwt)
                .then((res) => {
                    if (res) {
                        localStorage.removeItem('allMovies');
                        setIsLoggedIn(true);
                    }
                    navigate(path);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            mainApi
                .getUserInfo()
                .then((profileInfo) => {
                    setCurrentUser(profileInfo);
                })
                .catch((err) => {
                    console.log(err);
                });

            mainApi
                .getCards()
                .then((cardsData) => {
                    setSavedMovies(cardsData.reverse());
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isLoggedIn, navigate]);

    //регистрация пользователя
    function handleRegister({ name, email, password }) {
        mainApi
            .register(name, email, password)
            .then(() => {
                handleAuthorize({ email, password });
                setIsOk(true);
                setIsRegForm(true);
                setErrorRequest(false);
            })
            .catch((err) => {
                console.log(typeof err);
                console.log(err.message);
                setIsOk(false);
                setIsRegForm(true);
                setErrorRequest(true);
                if (err.code === 409) {
                    setErrorText('Пользователь с таким email уже существует');
                    return;
                }
                setErrorText('При регистрации пользователя произошла ошибка.');
            });
    }

    //авторизация пользователя
    function handleAuthorize({ email, password }) {
        mainApi
            .authorize(email, password)
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                    navigate('./movies');
                    setErrorRequest(false);
                }
            })
            .catch((err) => {
                setIsLoggedIn(false);
                setIsSuccess(false);
                setErrorRequest(true);
                if (err.code === 401) {
                    setErrorText('Вы ввели неправильный логин или пароль.');
                    return;
                }
                setErrorText('При авторизации произошла ошибка.');
            });
    }

    function handleUpdateUser(newUserInfo) {
        mainApi
            .setUserInfo(newUserInfo)
            .then((data) => {
                setIsOk(true);
                setCurrentUser(data);
                setIsProfileForm(true);
                setErrorRequest(false);
            })
            .catch((err) => {
                console.log(err);
                setIsOk(false);
                handleUnauthorized(err);
                setIsProfileForm(true);
                setErrorRequest(true);
                // setIsSuccess(false);
                if (err.code === 500) {
                    setErrorText('Пользователь с таким email уже существует');
                    console.error('Пользователь с таким email уже существует');
                    return;
                }
                setErrorText(
                    'При обновлении данных пользователя произошла ошибка.'
                );
            });
    }

    function handleCardLike(card) {
        mainApi
            .postCard(card)
            .then((newMovie) => {
                setSavedMovies([newMovie, ...savedMovies]);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
                handleUnauthorized(err);
            });
    }

    function handleCardDelete(card) {
        mainApi
            .deleteCard(card._id)
            .then(() => {
                setSavedMovies((state) =>
                    state.filter((item) => item._id !== card._id)
                );
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
                handleUnauthorized(err);
            });
    }

    function handleUnauthorized(err) {
        if (err === 'Error: 401') {
            handleSignOut();
        }
    }

    // Выход
    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('movieSearch');
        localStorage.removeItem('shortMovies');
        localStorage.removeItem('allMovies');
        navigate('/');
    };

    function closePopup() {
        setIsRegForm(false);
        setIsProfileForm(false);
        setIsOk(false);
        setIsSuccess(true);
    }

    // function closeUnsuccessPopup() {
    //     setIsSuccess(true);
    //     setIsOk(false);
    // }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Routes>
                    {/* основная страница */}
                    <Route path='/' element={<Main loggedIn={isLoggedIn} />} />

                    {/* страница авторизации */}
                    <Route
                        path='/signin'
                        element={
                            !isLoggedIn ? (
                                <Login
                                    onAuthorize={handleAuthorize}
                                    errorRequest={errorRequest}
                                    errorText={errorText}
                                />
                            ) : (
                                <Navigate to='/' />
                            )
                        }
                    />

                    {/* страница регистрации */}
                    <Route
                        path='/signup'
                        element={
                            !isLoggedIn ? (
                                <Register
                                    onRegister={handleRegister}
                                    isLoading={isLoading}
                                    errorRequest={errorRequest}
                                    errorText={errorText}
                                />
                            ) : (
                                <Navigate to='/' />
                            )
                        }
                    />

                    <Route
                        path='/movies'
                        index
                        element={
                            <>
                                <ProtectedRoute isLoggedIn={isLoggedIn} />
                                {
                                    <Movies
                                        loggedIn={isLoggedIn}
                                        savedMovies={savedMovies}
                                        onCardDelete={handleCardDelete}
                                        handleLikeClick={handleCardLike}
                                    />
                                }
                            </>
                        }
                    />
                    <Route
                        path='/saved-movies'
                        index
                        element={
                            <>
                                <ProtectedRoute isLoggedIn={isLoggedIn} />
                                {
                                    <SavedMovies
                                        savedMovies={savedMovies}
                                        loggedIn={isLoggedIn}
                                        onCardDelete={handleCardDelete}
                                    />
                                }
                            </>
                        }
                    />
                    <Route
                        path='/profile'
                        index
                        element={
                            <>
                                <ProtectedRoute isLoggedIn={isLoggedIn} />
                                {
                                    <Profile
                                        signOut={handleSignOut}
                                        onUpdateUser={handleUpdateUser}
                                        loggedIn={isLoggedIn}
                                        isLoading={isLoading}
                                        errorRequest={errorRequest}
                                        errorText={errorText}
                                    />
                                }
                            </>
                        }
                    />

                    {/* страница-ошибка */}

                    <Route path='*' element={<NotFound />} />
                </Routes>
                {/* <InfoTooltip
                    isSuccess={isSuccess}
                    onClose={closeUnsuccessPopup}
                /> */}
                <InfoTooltip
                    isProfileForm={isProfileForm}
                    isOk={isOk}
                    isRegForm={isRegForm}
                    onClose={closePopup}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
