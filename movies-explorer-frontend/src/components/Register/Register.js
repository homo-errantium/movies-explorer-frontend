import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import useForm from '../hooks/useForm';
import { USER_NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';

function Register({ onRegister, isLoading, errorRequest, errorText }) {
    const { userNewValues, errors, handleChange, isValidatedForm } = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({
            name: userNewValues.name,
            email: userNewValues.email,
            password: userNewValues.password,
        });
    }

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
            <form className='register__form' onSubmit={handleSubmit}>
                <fieldset className='register__fieldset'>
                    <label
                        htmlFor='register-name-input'
                        className='register__label'
                    >
                        Имя
                        <input
                            className='register__input'
                            type='text'
                            name='name'
                            id='register-name-input'
                            minLength='2'
                            maxLength='40'
                            value={userNewValues.name || ''}
                            onChange={handleChange}
                            required
                            placeholder='Имя'
                            pattern={USER_NAME_REGEX}
                        />
                        <span className='register__input-error'>
                            {errors.name}
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
                            value={userNewValues.email || ''}
                            onChange={handleChange}
                            required
                            placeholder='E-mail'
                            pattern={EMAIL_REGEX}
                        />
                        <span className='register__input-error'>
                            {errors.email}
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
                            value={userNewValues.password || ''}
                            onChange={handleChange}
                            required
                            minLength='8'
                            maxLength='30'
                            placeholder='Пароль'
                        />
                        <span className='register__input-error'>
                            {errors.password}
                        </span>
                    </label>
                </fieldset>
                <span
                    className={`${
                        errorRequest
                            ? 'register__form-error'
                            : 'register__form-error_no-display'
                    }`}
                >
                    {errorText}
                </span>
                <button
                    className={`register__enter-button ${
                        isValidatedForm ? '' : 'register__enter-button_disabled'
                    }`}
                    type='submit'
                    disabled={!isValidatedForm}
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
