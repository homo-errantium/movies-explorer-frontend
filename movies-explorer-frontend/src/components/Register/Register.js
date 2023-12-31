import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
    return (
        <main className='register' id='register'>
            <Link className='register__logo-link' to='/'>
                <img
                    src={logo}
                    alt='логотип страницы регистрации'
                    className='register__logo'
                />
            </Link>
            <h1 className='register__title'>Добро пожаловать!</h1>
            <form className='register__form'>
                <fieldset className='register__fieldset'>
                    <label
                        htmlFor='register-name-input'
                        className='register__label'
                    >
                        Имя
                        <input
                            className='register__input'
                            type='text'
                            name='email'
                            id='register-name-input'
                            minLength='1'
                            maxLength='30'
                            // value={true ? 'pochta@yandex.ru' : ''}
                            required
                            placeholder='Имя'
                        />
                        <span className='register__input-error'>
                            {'Ошибка'}
                        </span>
                    </label>
                    <label
                        htmlFor='register-email-input'
                        className='register__label'
                    >
                        E-mail
                        <input
                            className='register__input'
                            type='email'
                            name='email'
                            id='register-email-input'
                            // value={true ? 'pochta@yandex.ru' : ''}
                            required
                            placeholder='E-mail'
                        />
                        <span className='register__input-error'>
                            {'Ошибка'}
                        </span>
                    </label>
                    <label
                        htmlFor='register-password-input'
                        className='register__label'
                    >
                        Пароль
                        <input
                            className='register__input register__input_password'
                            type='password'
                            name='password'
                            id='register-password-input'
                            // value={true ? '12345678' : ''}
                            required
                            minLength='8'
                            maxLength='30'
                            disabled={false ? true : false}
                            placeholder='Пароль'
                        />
                        <span className='register__input-error'>
                            {'Что-то пошло не так'}
                        </span>
                    </label>
                </fieldset>
                <button
                    className='register__enter-button'
                    type='submit'
                    disabled={true}
                >
                    Зарегистрироваться
                </button>
                <p className='register__reg-description'>
                    Уже зарегистрированы?{' '}
                    <Link className='register__reg-link ' to='/signin'>
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    );
}

export default Register;
