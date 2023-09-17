import './Profile.css';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';

function Profile(props) {
    return (
        <>
            <Header />
            <main className='profile' id='profile' role='main'>
                <h1 className='profile__title'>Привет, {'Виталий'}!</h1>
                <form className='profile__form'>
                    <fieldset className='profile__fieldset'>
                        <label
                            htmlFor='profile-label'
                            className='profile__label'
                        >
                            Имя
                            <input
                                name='name'
                                className='profile__input'
                                id='profile__name-input'
                                type='text'
                                required
                                value={'Виталий'}
                            />
                            <span className='profile__input-error'>
                                {'Ошибка'}
                            </span>
                        </label>
                        <label
                            htmlFor='profile-label'
                            className='profile__label'
                        >
                            E-mail
                            <input
                                name='email'
                                className='profile__input'
                                id='profile__email-input'
                                type='email'
                                required
                                value={'pochta@yandex.ru'}
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
            </main>
        </>
    );
}

export default Profile;
