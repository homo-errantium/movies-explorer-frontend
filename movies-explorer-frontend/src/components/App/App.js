import React, { useState } from 'react';
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

import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

function App() {
    // навигация
    const navigate = useNavigate();
    const location = useLocation();

    const [editProfileMessage, setEditProfileMessage] = React.useState('');
    const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
    const [loginErrorMessage, setLoginErrorMessage] = React.useState('');

    const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(true);
    const [token, setToken] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [isMoviesErrorActive, setIsMoviesErrorActive] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [isShortMoviesChecked, setIsShortMoviesChecked] =
        React.useState(false);
    const [allMovies, setAllMovies] = React.useState([]);
    const [isSaving, setIsSaving] = React.useState(false);

    const isLoggedIn = localStorage.getItem('loggedIn');

    //авторизация пользователя
    function handleLogin(password, email) {
        setIsSaving(true);
        mainApi
            .authorize(password, email)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('loggedIn', 'true');
                    setLoginErrorMessage('');
                    navigate('/movies');
                } else if (data.error === 'Bad Request') {
                    setLoginErrorMessage('Введены невалидные данные');
                } else if (data.message) {
                    setLoginErrorMessage(data.message);
                }
            })
            .catch(() => {
                setLoginErrorMessage('Что-то пошло не так...');
            })
            .finally(() => {
                setIsSaving(false);
            });
    }

    // регистрация пользователя
    function handleRegister(name, password, email) {
        setIsSaving(true);
        mainApi
            .register(name, password, email)
            .then((res) => {
                console.log('good');
                if (res.user) {
                    setRegisterErrorMessage('');
                    handleLogin(password, email);
                } else if (res.error === 'Bad Request') {
                    setRegisterErrorMessage('Введены невалидные данные');
                } else if (res.message) {
                    setRegisterErrorMessage(res.message);
                }
            })
            .catch(() => {
                console.log('bad');
                setRegisterErrorMessage('Что-то пошло не так...');
            })
            .finally(() => {
                console.log('nothing else matter');
                setIsSaving(false);
            });
    }

    //редактирвание профиля пользователя
    function handleEditUserInfo(name, email) {
        mainApi
            .editUserData(token, name, email)
            .then((newUser) => {
                if (newUser._id) {
                    setCurrentUser(newUser);
                    setIsUpdateSuccess(true);
                    setEditProfileMessage('Профиль обновлен успешно!');
                } else if (newUser.message) {
                    setEditProfileMessage(newUser.message);
                    setIsUpdateSuccess(false);
                }
                return;
            })
            .catch(() => {
                setEditProfileMessage(
                    'При обновлении профиля произошла ошибка'
                );
                setIsUpdateSuccess(false);
            });
    }

    //выход из аккаунта
    function handleSignOut() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('movies');
        setMovies([]);
        setAllMovies([]);
        navigate('/');
    }
    // проверка на включение короткометражек
    function handleShortMoviesCheck(e) {
        setIsShortMoviesChecked(e.target.checked);
    }

    //фильтрация фильмов
    function handleSearchMovies(movies, keyWord) {
        let filteredMovies = [];
        movies.forEach((movie) => {
            if (movie.nameRU.indexOf(keyWord) > -1) {
                if (isShortMoviesChecked) {
                    if (movie.duration <= 40) {
                        return filteredMovies.push(movie);
                    }
                    return;
                }
                return filteredMovies.push(movie);
            }
        });
        return filteredMovies;
    }

    //управление поиском
    function searchSavedMovies(keyWord) {
        const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const searchSavedResult = handleSearchMovies(allSavedMovies, keyWord);
        setSavedMovies(searchSavedResult);
    }

    // очистка полей ошибок
    function clearAllErrorMessages() {
        setRegisterErrorMessage('');
        setLoginErrorMessage('');
        setEditProfileMessage('');
    }

    function searchMovies(keyWord) {
        setIsSearching(true);
        setMovies([]);
        setNotFound(false);
        setIsMoviesErrorActive(false);
        if (allMovies.length === 0) {
            moviesApi
                .getMovies()
                .then((movies) => {
                    setAllMovies(movies);
                    const searchResult = handleSearchMovies(movies, keyWord);

                    if (searchResult.length === 0) {
                        setNotFound(true);
                        setMovies([]);
                    } else {
                        localStorage.setItem(
                            'movies',
                            JSON.stringify(searchResult)
                        );
                        setMovies(JSON.parse(localStorage.getItem('movies')));
                    }
                })
                .catch(() => {
                    setIsMoviesErrorActive(true);
                    setMovies([]);
                })
                .finally(() => {
                    setIsSearching(false);
                    setIsShortMoviesChecked(false);
                });
        } else {
            const searchResult = handleSearchMovies(allMovies, keyWord);

            if (searchResult.length === 0) {
                setNotFound(true);
                setMovies([]);
                setIsSearching(false);
                setIsShortMoviesChecked(false);
            } else if (searchResult.length !== 0) {
                localStorage.setItem('movies', JSON.stringify(searchResult));
                setMovies(JSON.parse(localStorage.getItem('movies')));
                setIsSearching(false);
                setIsShortMoviesChecked(false);
            } else {
                setIsMoviesErrorActive(true);
                setMovies([]);
                setIsShortMoviesChecked(false);
            }
        }
    }

    function handleSaveMovie(movie) {
        mainApi
            .saveMovie(token, movie)
            .then((savedMovie) => {
                const films = [...savedMovies, savedMovie];
                localStorage.setItem('savedMovies', JSON.stringify(films));
                setSavedMovies((prevState) => [...prevState, savedMovie]);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}, попробуйте еще раз`);
            });
    }

    function handleDeleteMovie(movieId) {
        mainApi
            .deleteMovie(token, movieId)
            .then(() => {
                const newSavedMovies = savedMovies.filter((deletedMovie) => {
                    return deletedMovie._id !== movieId;
                });
                setSavedMovies(newSavedMovies);
                localStorage.setItem(
                    'savedMovies',
                    JSON.stringify(newSavedMovies)
                );
            })
            .catch((err) => {
                console.log(`Ошибка ${err}, попробуйте еще раз`);
            });
    }

    React.useEffect(() => {
        function checkToken() {
            if (localStorage.getItem('token')) {
                const token = localStorage.getItem('token');
                const searchedMovies = JSON.parse(
                    localStorage.getItem('movies')
                );

                if (token) {
                    Promise.all([
                        mainApi.getUserData(token),
                        mainApi.getSavedMovies(token),
                    ])
                        .then(([userData, movies]) => {
                            setCurrentUser(userData);
                            setToken(localStorage.getItem('token'));
                            const films = [...savedMovies, movies];
                            localStorage.setItem(
                                'savedMovies',
                                JSON.stringify(films)
                            );
                            setSavedMovies((prevState) => [
                                ...prevState,
                                movies,
                            ]);
                            setMovies(searchedMovies);
                            localStorage.setItem('loggedIn', 'true');
                        })
                        .catch((err) => {
                            console.log(`Ошибка ${err}, попробуйте еще раз`);
                        });
                }
            }
        }
        checkToken();
    }, [navigate, isLoggedIn]);

    // React.useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setEditProfileMessage('');

    //     mainApi.getSavedMovies(token).then((res) => {
    //         setSavedMovies(res);
    //     });
    // }, [location]);

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
                                    onLogin={handleLogin}
                                    errorMessage={loginErrorMessage}
                                    onClear={clearAllErrorMessages}
                                    isSaving={isSaving}
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
                                    errorMessage={registerErrorMessage}
                                    onClear={clearAllErrorMessages}
                                    isSaving={isSaving}
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
                                        movies={movies}
                                        onSearchMovies={searchMovies}
                                        isSearching={isSearching}
                                        notFound={notFound}
                                        isErrorActive={isMoviesErrorActive}
                                        onMovieSave={handleSaveMovie}
                                        onDeleteMovie={handleDeleteMovie}
                                        savedMovies={savedMovies}
                                        onShortMoviesCheck={
                                            handleShortMoviesCheck
                                        }
                                        isShortMoviesChecked={
                                            isShortMoviesChecked
                                        }
                                    />
                                }
                            </>
                        }
                    />

                    {/*
                    <ProtectedRoute
                        path='/movies'
                        component={Movies}
                        loggedIn={isLoggedIn}
                        movies={movies}
                        onSearchMovies={searchMovies}
                        isSearching={isSearching}
                        notFound={notFound}
                        isErrorActive={isMoviesErrorActive}
                        onMovieSave={handleSaveMovie}
                        onDeleteMovie={handleDeleteMovie}
                        savedMovies={savedMovies}
                        onShortMoviesCheck={handleShortMoviesCheck}
                        isShortMoviesChecked={isShortMoviesChecked}
                    ></ProtectedRoute> */}

                    <Route
                        path='/saved-movies'
                        index
                        element={
                            <>
                                <ProtectedRoute isLoggedIn={isLoggedIn} />
                                {
                                    <SavedMovies
                                        loggedIn={isLoggedIn}
                                        movies={savedMovies}
                                        onDeleteMovie={handleDeleteMovie}
                                        onSearchSavedMovies={searchSavedMovies}
                                        onShortMoviesCheck={
                                            handleShortMoviesCheck
                                        }
                                        isShortMoviesChecked={
                                            isShortMoviesChecked
                                        }
                                    />
                                }
                            </>
                        }
                    />

                    {/*                    
                    <ProtectedRoute
                        path='/saved-movies'
                        component={SavedMovies}
                        loggedIn={isLoggedIn}
                        movies={savedMovies}
                        onDeleteMovie={handleDeleteMovie}
                        onSearchSavedMovies={searchSavedMovies}
                        onShortMoviesCheck={handleShortMoviesCheck}
                        isShortMoviesChecked={isShortMoviesChecked}
                    ></ProtectedRoute> */}

                    <Route
                        path='/profile'
                        index
                        element={
                            <>
                                <ProtectedRoute isLoggedIn={isLoggedIn} />
                                {
                                    <Profile
                                        loggedIn={isLoggedIn}
                                        onSignOut={handleSignOut}
                                        onChangeUser={handleEditUserInfo}
                                        message={editProfileMessage}
                                        isUpdateSuccess={isUpdateSuccess}
                                        isSaving={isSaving}
                                    />
                                }
                            </>
                        }
                    />

                    {/* <ProtectedRoute
                        path='/profile'
                        component={Profile}
                        loggedIn={isLoggedIn}
                        onSignOut={handleSignOut}
                        onChangeUser={handleEditUserInfo}
                        message={editProfileMessage}
                        isUpdateSuccess={isUpdateSuccess}
                        isSaving={isSaving}
                    ></ProtectedRoute> */}

                    {/* страница-ошибка */}

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
