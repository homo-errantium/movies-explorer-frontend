import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import account from '../../images/account.svg';

function BurgerMenu({ handleClose }) {
    return (
        <div className='burger-menu'>
            <div
                className='burger-menu__container-empty'
                onClick={handleClose}
            ></div>
            <div className='burger-menu__container'>
                <button
                    className='burger-menu__close-button'
                    type='button'
                    onClick={handleClose}
                ></button>
                <nav className='burger-menu__links'>
                    <NavLink
                        to='/'
                        className='burger-menu__link'
                        onClick={handleClose}
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to='/movies'
                        className='burger-menu__link'
                        onClick={handleClose}
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to='/saved-movies'
                        className='burger-menu__link'
                        onClick={handleClose}
                    >
                        Сохранённые фильмы
                    </NavLink>
                </nav>
                <NavLink
                    to='/profile'
                    className='burger-menu__link burger-menu__account-container'
                    onClick={handleClose}
                >
                    <span className='burger-menu__account-title'>Аккаунт</span>
                    <div className='burger-menu__account-logo-container'>
                        <img
                            className='burger-menu__account-logo'
                            src={account}
                            alt='Логотип аккаунта'
                        />
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default BurgerMenu;
