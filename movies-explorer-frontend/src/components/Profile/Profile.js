import './Profile.css';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';

function Profile(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} />
            <main className='profile main' id='profile'>
                <section className='profile__section'>
                    <h1 className='profile__title'>Привет, {'Виталий'}!</h1>
                    <form className='profile__form'>
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
                                    // value={'Виталий'}
                                    placeholder='Имя'
                                    minLength={2}
                                    maxLength='30'
                                />
                                <span className='profile__input-error'>
                                    {'Ошибка'}
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
                                    // value={'pochta@yandex.ru'}
                                    placeholder='E-mail'
                                />
                                <span className='profile__input-error'>
                                    {'Ошибка'}
                                </span>
                            </label>
                        </fieldset>
                        <button
                            className='profile__save-button'
                            type='submit'
                            disabled={true ? true : false}
                        >
                            Редактировать
                        </button>
                        <NavLink className='profile__logout-link' to='/'>
                            Выйти из аккаунта
                        </NavLink>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Profile;
