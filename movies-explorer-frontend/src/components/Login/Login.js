import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import useForm from '../hooks/useForm';
import { EMAIL_REGEX } from '../../utils/constants';

function Login({ onAuthorize, isLoading }) {
    const { enteredValues, errors, handleChange, isFormValid } = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        onAuthorize({
            email: enteredValues.email,
            password: enteredValues.password,
        });
    }

    return (
        <main className='login' id='login'>
            <Link className='login__logo-link' to='/'>
                <img
                    src={logo}
                    alt='логотип страницы авторизации'
                    className='login__logo'
                />
            </Link>
            <h1 className='login__title'>Рады видеть!</h1>
            <form className='login__form' onSubmit={handleSubmit} noValidate>
                <fieldset className='login__fieldset'>
                    <label htmlFor='login-email-input' className='login__label'>
                        E-mail
                        <input
                            placeholder='E-mail'
                            className='login__input'
                            type='email'
                            name='email'
                            id='login-email-input'
                            value={enteredValues.email || ''}
                            onChange={handleChange}
                            required
                            pattern={EMAIL_REGEX}
                        />
                        <span className='login__input-error'>
                            {errors.email}
                        </span>
                    </label>

                    <label
                        htmlFor='login-password-input'
                        className='login__label'
                    >
                        Пароль
                        <input
                            placeholder='Пароль'
                            className='login__input'
                            type='password'
                            name='password'
                            id='login-password-input'
                            value={enteredValues.password || ''}
                            onChange={handleChange}
                            required
                            minLength='8'
                            maxLength='30'
                        />
                        <span className='login__input-error'>
                            {errors.password}
                        </span>
                    </label>
                </fieldset>
                <button
                    className={`login__enter-button ${
                        isFormValid ? '' : 'login__enter-button_disabled'
                    }`}
                    type='submit'
                    disabled={!isFormValid ? true : false}
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
        </main>
    );
}

export default Login;
