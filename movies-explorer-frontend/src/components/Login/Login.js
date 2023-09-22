import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import { useForm } from '../hooks/useForm';

function Login(props) {
    const { values, handleChange, errors, isFormValid } = useForm();

    function handleLogin(e) {
        e.preventDefault();

        props.onLogin(values.password, values.email);

        props.onClear();
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
            <form className='login__form' onSubmit={handleLogin}>
                <fieldset className='login__fieldset'>
                    <label htmlFor='login-email-input' className='login__label'>
                        E-mail
                        <input
                            placeholder='E-mail'
                            className='login__input'
                            type='email'
                            name='email'
                            id='login-email-input'
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                            disabled={props.isSaving}
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
                            value={values.password || ''}
                            onChange={handleChange}
                            required
                            minLength='8'
                            maxLength='30'
                            disabled={props.isSaving}
                        />
                        <span className='login__input-error'>
                            {errors.password}
                        </span>
                    </label>
                </fieldset>
                <span className='login__submit-error auth__submit-error'>
                    {props.errorMessage}
                </span>
                <button
                    className={`login__enter-button ${
                        isFormValid ? '' : 'login__enter-button_disabled'
                    }`}
                    type='submit'
                    disabled={!isFormValid}
                >
                    Войти
                </button>
                <p className='login__reg-description'>
                    Ещё не зарегистрированы?{' '}
                    <Link
                        className='login__reg-link '
                        to='/signup'
                        onClick={props.onClear}
                    >
                        Регистрация
                    </Link>
                </p>
            </form>
        </main>
    );
}

export default Login;
