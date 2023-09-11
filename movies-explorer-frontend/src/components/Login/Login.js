import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

function Login() {
    return (
        <section className='login' id='login'>
            <Link className='login__logo-link' to='/'>
                <img
                    src={logo}
                    alt='логотип страницы авторизации'
                    className='login__logo'
                />
            </Link>
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form'>
                <fieldset className='login__fieldset'>
                    <label htmlFor='login-label' className='login__label'>
                        E-mail
                        <input
                            className='login__input'
                            type='email'
                            name='email'
                            id='login__email-input'
                            // value={true ? 'pochta@yandex.ru' : ''}
                            required
                        />
                        <span className='login__input-error'>{'Ошибка'}</span>
                    </label>
                    <hr className='login__line' />
                    <label htmlFor='login-label' className='login__label'>
                        Пароль
                        <input
                            className='login__input'
                            type='password'
                            name='password'
                            id='login__password-input'
                            // value={true ? '12345678' : ''}
                            required
                            minLength='8'
                            disabled={false ? true : false}
                        />
                        <span className='login__input-error'>{'Ошибка'}</span>
                    </label>
                    <hr className='login__line' />
                </fieldset>
                <button
                    className='login__enter-button'
                    type='submit'
                    disabled={true}
                >
                    Войти
                </button>
                <p className='login__reg-description'>
                    Ещё не зарегистрированы?{' '}
                    <Link className='login__reg-link ' to='/signup'>
                        Регистрация
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Login;
