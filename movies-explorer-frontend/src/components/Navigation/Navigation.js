import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/account.svg';

function Navigation(props) {
    return (
        <div
            className={
                // true
                props.loggedIn
                    ? 'navigation__container'
                    : 'navigation__container navigation__position-right'
            }
        >
            <nav
                className={
                    // true
                    props.loggedIn
                        ? 'navigation__movies'
                        : 'navigation__movies navigation__no-display'
                }
            >
                <Link
                    to='/movies'
                    className='navigation__link navigation__link_type_movies'
                >
                    Фильмы
                </Link>
                <Link
                    to='/saved-movies'
                    className='navigation__link navigation__link_type_movies'
                >
                    Сохранённые фильмы
                </Link>
            </nav>
            <nav className='navigation__users'>
                {
                    // true
                    props.loggedIn ? (
                        <Link
                            to='/profile'
                            className='navigation__link header__account-container'
                        >
                            <span className='header__account-title'>
                                Аккаунт
                            </span>
                            <div className='header__account-logo-container'>
                                <img
                                    className='header__account-logo'
                                    src={account}
                                    alt='Логотип аккаунта'
                                />
                            </div>
                        </Link>
                    ) : (
                        <nav className='navigation__authorize'>
                            <Link
                                to='/signup'
                                className='navigation__link navigation__link_type_registration'
                            >
                                Регистрация
                            </Link>
                            <Link
                                to='/signin'
                                className='navigation__link navigation__link_type_login'
                            >
                                Войти
                            </Link>
                        </nav>
                    )
                }
            </nav>
        </div>
    );
}

export default Navigation;
