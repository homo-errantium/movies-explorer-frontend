import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isMain, loggedIn }) {
    return (
        /*цвет шапки*/
        <header className={isMain ? 'header' : 'header header_black'}>
            <NavLink className='header__logo' to='/'>
                <img
                    className='header__logo-image'
                    src={logo}
                    alt='Логотип сайта'
                />
            </NavLink>
            <Navigation loggedIn={loggedIn} />
        </header>
    );
}

export default Header;
