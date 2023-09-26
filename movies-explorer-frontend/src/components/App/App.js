import React, { useEffect, useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    useLocation,
    useNavigate,
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
import {
    ERRORTEXT_LOGIN,
    ERRORTEXT_REGISTER,
    ERRORTEXT_EMAIL_EXIST,
    ERRORTEXT_UPDATE_USER_DATA,
    ERRORTEXT_INCORRECT_USER_DATA,
} from '../../utils/errorText';

function App() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
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
            Promise.all([mainApi.getUserInfo(), mainApi.getCards()])
                .then(([profileInfo, cardsData]) => {
                    setCurrentUser(profileInfo);
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
                setIsSuccess(true);
                setIsRegForm(true);
                setErrorRequest(false);
            })
            .catch((err) => {
                console.log(err.status);
                setIsSuccess(false);
                setIsRegForm(true);
                setErrorRequest(true);
                if (err.status === 409) {
                    setErrorText(ERRORTEXT_EMAIL_EXIST);
                    return;
                } else {
                    setErrorText(ERRORTEXT_REGISTER);
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
                    setErrorText(ERRORTEXT_INCORRECT_USER_DATA);
                    return;
                } else {
                    setErrorText(ERRORTEXT_LOGIN);
                }
            });
    }

    function handleUpdateUser(newUserInfo) {
        mainApi
            .setUserInfo(newUserInfo)
            .then((data) => {
                setIsSuccess(true);
                setCurrentUser(data);
                setIsProfileForm(true);
                setErrorRequest(false);
            })
            .catch((err) => {
                console.log(err.status);
                setIsSuccess(false);
                handleUnauthorized(err);
                setIsProfileForm(true);
                setErrorRequest(true);
                if (err.status === 500) {
                    setErrorText(ERRORTEXT_EMAIL_EXIST);
                    return;
                } else {
                    setErrorText(ERRORTEXT_UPDATE_USER_DATA);
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
        setIsSuccess(false);
    }

    function resetError() {
        setErrorRequest(false);
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
                                    resetError={resetError}
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
                                    resetError={resetError}
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
                    isSuccess={isSuccess}
                    isRegForm={isRegForm}
                    onClose={closePopup}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
