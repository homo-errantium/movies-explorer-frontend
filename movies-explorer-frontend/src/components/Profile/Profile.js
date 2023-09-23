import React, { useEffect, useContext, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { USER_NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';

function Profile({ signOut, onUpdateUser, loggedIn, isLoading }) {
    const currentUser = useContext(CurrentUserContext);

    const { enteredValues, errors, handleChange, isFormValid, resetForm } =
        useForm();
    const [isLastValues, setIsLastValues] = useState(false);

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: enteredValues.name,
            email: enteredValues.email,
        });
    }

    useEffect(() => {
        if (
            currentUser.name === enteredValues.name &&
            currentUser.email === enteredValues.email
        ) {
            setIsLastValues(true);
        } else {
            setIsLastValues(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enteredValues]);
    return (
        <div className='wrapper'>
            <Header loggedIn={loggedIn} main={false} />
            <main className='profile main' id='profile'>
                <section className='profile__section'>
                    <h1 className='profile__title'>
                        Привет, {currentUser.name}!
                    </h1>
                    <form className='profile__form' onSubmit={handleSubmit}>
                        <fieldset className='profile__fieldset'>
                            <label
                                htmlFor='profile-name-input'
                                className='profile__label'
                            >
                                Имя
                                <input
                                    name='name'
                                    className='profile__input'
                                    id='profile-name-input'
                                    type='text'
                                    required
                                    value={enteredValues.name || ''}
                                    onChange={handleChange}
                                    placeholder='Имя'
                                    // pattern={USER_NAME_REGEX}
                                    minLength={2}
                                    maxLength='30'
                                />
                                <span className='profile__input-error'>
                                    {errors.name}
                                </span>
                            </label>
                            <label
                                htmlFor='profile-email-input'
                                className='profile__label'
                            >
                                E-mail
                                <input
                                    name='email'
                                    className='profile__input'
                                    id='profile-email-input'
                                    type='email'
                                    required
                                    value={enteredValues.email || ''}
                                    onChange={handleChange}
                                    placeholder='E-mail'
                                    // pattern={EMAIL_REGEX}
                                />
                                <span className='profile__input-error'>
                                    {errors.email}
                                </span>
                            </label>
                        </fieldset>

                        <button
                            type='submit'
                            disabled={!isFormValid ? true : false}
                            className={
                                !isFormValid || isLoading || isLastValues
                                    ? 'profile__button profile__button_type_save profile__button_type_save_disabled'
                                    : 'profile__button profile__button_type_save'
                            }
                        >
                            Редактировать
                        </button>

                        <NavLink
                            className='profile__logout-link'
                            to='/'
                            onClick={signOut}
                        >
                            Выйти из аккаунта
                        </NavLink>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Profile;
