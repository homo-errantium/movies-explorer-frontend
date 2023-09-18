import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        // <CurrentUserContext.Provider value={currentUser}>

        <div className='page'>
            <Routes>
                <Route
                    path='/signin'
                    element={<Login loggedIn={isLoggedIn} />}
                />
                <Route
                    path='/signup'
                    element={<Register loggedIn={isLoggedIn} />}
                />
                <Route path='/' element={<Main loggedIn={isLoggedIn} />} />
                <Route
                    path='/movies'
                    element={<Movies loggedIn={isLoggedIn} />}
                />
                <Route
                    path='/saved-movies'
                    element={<SavedMovies loggedIn={isLoggedIn} />}
                />
                <Route
                    path='/profile'
                    element={<Profile loggedIn={isLoggedIn} />}
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>

        // </CurrentUserContext.Provider>
    );
}

export default App;
