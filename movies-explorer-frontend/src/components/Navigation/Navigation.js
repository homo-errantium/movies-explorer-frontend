import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
// import TestBurgerMenu from '../TestBurgerMenu/TestBurgerMenu';
import account from '../../images/account.svg';

function Navigation(props) {
    const [isClicked, setIsClicked] = useState(false);

    function handleOpen() {
        setIsClicked(true);
    }

    function handleClose() {
        setIsClicked(false);
    }

    return (
        <div
            className={
                props.loggedIn ? 'navigation' : 'navigation navigation_right'
            }
        >
            {props.loggedIn ? (
                <>
                    <nav className='navigation__movies'>
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
                    <Link
                        to='/profile'
                        className='navigation__link header__account-container'
                    >
                        <span className='header__account-title'>Аккаунт</span>
                        <div className='header__account-logo-container'>
                            <img
                                className='header__account-logo'
                                src={account}
                                alt='Логотип аккаунта'
                            />
                        </div>
                    </Link>
                    {/* <TestBurgerMenu /> */}
                    <button
                        className='navigation__burger-button'
                        onClick={handleOpen}
                    >
                        <span className='navigation__burger-button-element'></span>
                    </button>
                    {/* <button
                        className='navigation__burger-button'
                        onClick={handleOpen}
                    >
                        <span className='navigation__burger-button-element'></span>
                        <span className='navigation__burger-button-element'></span>
                        <span className='navigation__burger-button-element'></span>
                    </button> */}
                    {isClicked ? <BurgerMenu handleClose={handleClose} /> : ''}
                </>
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
            )}
        </div>
    );
}

export default Navigation;
