import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { USER_NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';

function Profile(props) {
    const { values, setValues, handleChange, errors, isFormValid } = useForm();
    const [isFormDisabled, setIsFormDisabled] = React.useState(true);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);

    function handleEditProfileClick(e) {
        e.preventDefault();

        setIsFormDisabled(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onChangeUser(values.name, values.email);
    }

    React.useEffect(() => {
        setIsFormDisabled(props.isUpdateSuccess);
    }, [props.isUpdateSuccess, props.onChangeUser]);

    React.useEffect(() => {
        if (props.isSaving) {
            setIsFormDisabled(true);
        }
    }, [props.isSaving]);
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} main={false} />
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
                                    value={values.name || ''}
                                    onChange={handleChange}
                                    placeholder='Имя'
                                    pattern={USER_NAME_REGEX}
                                    minLength={2}
                                    maxLength='30'
                                    disabled={isFormDisabled}
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
                                    value={values.email || ''}
                                    onChange={handleChange}
                                    placeholder='E-mail'
                                    pattern={EMAIL_REGEX}
                                    disabled={isFormDisabled}
                                />
                                <span className='profile__input-error'>
                                    {errors.email}
                                </span>
                            </label>
                        </fieldset>
                        <span
                            className={`profile__form-message ${
                                props.isUpdateSuccess
                                    ? 'profile__form-message_type_success'
                                    : 'profile__form-message_type_error'
                            }`}
                        >
                            {props.message}
                        </span>
                        {isFormDisabled ? (
                            <button
                                className='profile__button profile__button_type_edit'
                                type='submit'
                                onClick={handleEditProfileClick}
                            >
                                Редактировать
                            </button>
                        ) : (
                            <button
                                type='submit'
                                disabled={!isFormValid}
                                className={`profile__button profile__button_type_save ${
                                    isFormValid
                                        ? ''
                                        : 'profile__button_type_save_disabled'
                                }`}
                            >
                                Сохранить
                            </button>
                        )}

                        <NavLink
                            className='profile__logout-link'
                            to='/'
                            onClick={props.onSignOut}
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
