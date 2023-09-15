import './TestBurgerMenu.css';
import React from 'react';
import { Link } from 'react-router-dom';
import account from '../../images/account.svg';

function TestBurgerMenu() {
    return (
        <div className='menu__container'>
            <input className='menu__button' type='checkbox' id='menu-btn' />
            <label className='menu__label' for='menu-btn'>
                <span class='menu__button-image' />
            </label>

            <nav className='menu'>
                <Link to='/' className='menu__link'>
                    Главная
                </Link>
                <Link to='/movies' className='menu__link'>
                    Фильмы
                </Link>
                <Link to='/saved-movies' className='menu__link'>
                    Сохранённые фильмы
                </Link>
                <Link
                    to='/profile'
                    className='menu__account-container menu__link'
                >
                    <span className='menu__account-title'>Аккаунт</span>
                    <div className='menu__account-logo-container'>
                        <img
                            className='menu__account-logo'
                            src={account}
                            alt='Логотип аккаунта'
                        />
                    </div>
                </Link>
            </nav>
        </div>
    );
}

export default TestBurgerMenu;
