import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

// import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

function App() {
    return (
        // <CurrentUserContext.Provider value={currentUser}>

        <div className='page'>
            <Routes>
                <Route path='/signin' element={<Login />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/' element={<Main />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/saved-movies' element={<SavedMovies />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>

        // </CurrentUserContext.Provider>
    );
}

export default App;
