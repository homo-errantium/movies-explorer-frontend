import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import './App.css';

// import Header from '../Header/Header';
import Main from '../Main/Main';
// import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

// import EditProfilePopup from './EditProfilePopup';
// import EditAvatarPopup from './EditAvatarPopup';
// import AddPlacePopup from './AddPlacePopup';
// import ImagePopup from './ImagePopup';
// import InfoTooltip from './InfoTooltip';

// import api from '../utils/Api';
// import * as auth from '../utils/Auth';
// import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    return (
        // <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
            <div className='page__container'>
                <Routes>
                    <Route path='/signin' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/' element={<Main />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
        // </CurrentUserContext.Provider>
    );
}

export default App;
