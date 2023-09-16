import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
    return (
        <>
            <Header />
            <section className='profile' id='profile'>
                <h2 className='profile__title'>Привет, {'Виталий'}!</h2>
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
                    <button
                        className='profile__logout-button'
                        type='button'
                        onClick={props.signOut}
                    >
                        Выйти из аккаунта
                    </button>
                </form>
            </section>
        </>
    );
}

export default Profile;
