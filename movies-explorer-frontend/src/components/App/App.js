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
import * as mainApi from '../../utils/MainApi';

function App() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isOk, setIsOk] = useState(false);
    const [errorRequest, setErrorRequest] = React.useState(false);
    const [errorText, setErrorText] = React.useState(false);
    const [isProfileForm, setIsProfileForm] = useState(false);
    const [isRegForm, setIsRegForm] = useState(false);

    const path = location.pathname;
    const navigate = useNavigate();

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
                handleLogin({ email, password });
                setIsOk(true);
                setIsRegForm(true);
                setErrorRequest(false);
            })
            .catch((err) => {
                console.log(err.status);
                setIsOk(false);
                setIsRegForm(true);
                setErrorRequest(true);
                if (err.status === 409) {
                    setErrorText('Пользователь с таким email уже существует');
                    return;
                } else {
                    setErrorText(
                        'При регистрации пользователя произошла ошибка.'
                    );
                }
            });
    }

    //авторизация пользователя
    function handleLogin({ email, password }) {
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
                console.log(err.status);
                setIsLoggedIn(false);
                setErrorRequest(true);
                if (err.status === 401) {
                    setErrorText('Вы ввели неправильный логин или пароль.');
                    return;
                } else {
                    setErrorText('При авторизации произошла ошибка.');
                }
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
                console.log(err.status);
                setIsOk(false);
                handleUnauthorized(err);
                setIsProfileForm(true);
                setErrorRequest(true);
                if (err.status === 500) {
                    setErrorText('Пользователь с таким email уже существует');
                    console.error('Пользователь с таким email уже существует');
                    return;
                } else {
                    setErrorText(
                        'При обновлении данных пользователя произошла ошибка.'
                    );
                }
            });
    }

    function handleCardLike(card) {
        mainApi
            .postCard(card)
            .then((newMovie) => {
                setSavedMovies([newMovie, ...savedMovies]);
            })
            .catch((err) => {
                console.log(err.status);
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
                console.log(err.status);
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
    }

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
                                    onAuthorize={handleLogin}
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
                                    errorRequest={errorRequest}
                                    errorText={errorText}
                                />
                            ) : (
                                <Navigate to='/' />
                            )
                        }
                    />
                    {/* страница фильмы */}
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

                    {/* страница созраненные фиьлмы */}
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

                    {/* страница профиля */}
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

                {/* окно попапа уведомления */}
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
