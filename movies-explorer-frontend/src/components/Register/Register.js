import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import useForm from '../hooks/useForm';

function Register({ onRegister, isLoading }) {
    const { enteredValues, errors, handleChange, isFormValid } = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({
            name: enteredValues.name,
            email: enteredValues.email,
            password: enteredValues.password,
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
                            value={enteredValues.name || ''}
                            onChange={handleChange}
                            required
                            placeholder='Имя'
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
                            value={enteredValues.email || ''}
                            onChange={handleChange}
                            required
                            placeholder='E-mail'
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
                            value={enteredValues.password || ''}
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
                <button
                    className={`register__enter-button ${
                        isFormValid ? '' : 'register__enter-button_disabled'
                    }`}
                    type='submit'
                    disabled={!isFormValid}
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
