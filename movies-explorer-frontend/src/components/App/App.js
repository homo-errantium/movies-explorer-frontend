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
    const [isUpdate, setIsUpdate] = useState(false);
    const path = location.pathname;
    const [isSuccess, setIsSuccess] = useState(true);

    const [isProfileForm, setIsProfileForm] = useState(false);
    const [isRegForm, setIsRegForm] = useState(false);
    const [isRegistred, setIsRegistred] = useState(false);

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
                setIsRegistred(true);
                setIsRegForm(true);
            })
            .catch((err) => {
                setIsRegistred(false);
                setIsRegForm(true);
                // setIsSuccess(false);
                console.log(err);
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
                    navigate.push('./movies');
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            });
    }

    function handleUpdateUser(newUserInfo) {
        mainApi
            .setUserInfo(newUserInfo)
            .then((data) => {
                setIsUpdate(true);
                setCurrentUser(data);
                setIsProfileForm(true);
            })
            .catch((err) => {
                setIsUpdate(false);
                console.log(err);
                handleUnauthorized(err);
                setIsProfileForm(true);
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
        navigate.push('/');
    };

    function closePopup() {
        setIsRegForm(false);
        setIsProfileForm(false);
        setIsRegistred(false);
        setIsSuccess(true);
    }

    // function closeUnsuccessPopup() {
    //     setIsSuccess(true);
    //     setIsUpdate(false);
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
                                    isLoading={isLoading}
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
                    isRegistred={isRegistred}
                    isRegForm={isRegForm}
                    isUpdate={isUpdate}
                    onClose={closePopup}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
