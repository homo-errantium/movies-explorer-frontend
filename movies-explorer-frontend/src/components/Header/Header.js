import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
    console.log(props.loggedIn);
    return (
        /*цвет шапки*/
        <header className={props.isMain ? 'header' : 'header header_black'}>
            <NavLink className='header__logo' to='/'>
                <img
                    className='header__logo-image'
                    src={logo}
                    alt='Логотип сайта'
                />
            </NavLink>
            <Navigation loggedIn={props.loggedIn} />
        </header>
    );
}

export default Header;
