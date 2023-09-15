import './TestBurgerMenu.css';
import React from 'react';
import { Link } from 'react-router-dom';
import account from '../../images/account.svg';

function TestBurgerMenu() {
    return (
        <div className='menu__container'>
            <input class='menu-btn' type='checkbox' id='menu-btn' />
            <label class='menu-icon' for='menu-btn'>
                <span class='navicon' />
            </label>

            <nav class='menu'>
                <Link to='/' className='nav-item'>
                    Главная
                </Link>
                <Link to='/movies' className='nav-item'>
                    Фильмы
                </Link>
                <Link to='/saved-movies' className='nav-item'>
                    Сохранённые фильмы
                </Link>
                <Link
                    to='/profile'
                    className=' burger-menu__account-container nav-item'
                >
                    <span className='burger-menu__account-title'>Аккаунт</span>
                    <div className='burger-menu__account-logo-container'>
                        <img
                            className='burger-menu__account-logo'
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
