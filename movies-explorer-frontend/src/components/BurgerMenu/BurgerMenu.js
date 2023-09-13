import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import account from '../../images/account.svg';

function BurgerMenu() {
    return (
        <div className='burger-menu'>
            <div className='burger-menu__container'>
                <button className='burger-menu__close-button'></button>
                <nav className='burger-menu__links'>
                    <Link to='/' className='burger-menu__link'>
                        Главная
                    </Link>
                    <Link to='/movies' className='burger-menu__link'>
                        Фильмы
                    </Link>
                    <Link to='/saved-movies' className='burger-menu__link'>
                        Сохранённые фильмы
                    </Link>
                </nav>
                <Link
                    to='/profile'
                    className='burger-menu__link burger-menu__account-container'
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
            </div>
        </div>
    );
}

export default BurgerMenu;
