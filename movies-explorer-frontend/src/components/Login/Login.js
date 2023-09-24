import React from 'react';
import { NavLink } from 'react-router-dom';
import './Login.css';
import useForm from '../hooks/useForm';
import { EMAIL_REGEX } from '../../utils/constants';
import logo from '../../images/logo.svg';

function Login({ onAuthorize, errorRequest, errorText }) {
    const { userNewValues, errors, handleChange, isValidatedForm } = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        onAuthorize({
            email: userNewValues.email,
            password: userNewValues.password,
        });
    }

    return (
        <main className='login' id='login'>
            <NavLink className='login__logo-link' to='/'>
                <img
                    src={logo}
                    alt='логотип страницы авторизации'
                    className='login__logo'
                />
            </NavLink>
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
                            value={userNewValues.email || ''}
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
                            value={userNewValues.password || ''}
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
                <span
                    className={`login__form-error ${
                        errorRequest ? '' : 'login__form-error_no-display'
                    }`}
                >
                    {errorText}
                </span>
                <button
                    className={`login__enter-button ${
                        isValidatedForm ? '' : 'login__enter-button_disabled'
                    }`}
                    type='submit'
                    disabled={!isValidatedForm ? true : false}
                >
                    Войти
                </button>
                <p className='login__reg-description'>
                    Ещё не зарегистрированы?
                    <NavLink className='login__reg-link ' to='/signup'>
                        Регистрация
                    </NavLink>
                </p>
            </form>
        </main>
    );
}

export default Login;
