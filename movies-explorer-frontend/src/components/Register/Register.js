import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
    return (
        <section className='register' id='register'>
            <Link className='register__logo-link' to='/'>
                <img
                    src={logo}
                    alt='логотип страницы регистрации'
                    className='register__logo'
                />
            </Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form'>
                <fieldset className='register__fieldset'>
                    <label htmlFor='register-label' className='register__label'>
                        Имя
                        <input
                            className='register__input'
                            type='text'
                            name='email'
                            id='register__name-input'
                            // value={true ? 'pochta@yandex.ru' : ''}
                            required
                        />
                        <span className='register__input-error'>
                            {'Ошибка'}
                        </span>
                    </label>
                    <hr className='register__line' />
                    <label htmlFor='register-label' className='register__label'>
                        E-mail
                        <input
                            className='register__input'
                            type='email'
                            name='email'
                            id='register__email-input'
                            // value={true ? 'pochta@yandex.ru' : ''}
                            required
                        />
                        <span className='register__input-error'>
                            {'Ошибка'}
                        </span>
                    </label>
                    <hr className='register__line' />
                    <label htmlFor='register-label' className='register__label'>
                        Пароль
                        <input
                            className='register__input'
                            type='password'
                            name='password'
                            id='register__password-input'
                            // value={true ? '12345678' : ''}
                            required
                            minLength='8'
                            disabled={false ? true : false}
                        />
                        <hr className='register__line' />
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
                    <Link className='register__reg-link ' to='/signup'>
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Register;
