import React from 'react';
import './AboutMe.css';
import profile from '../../images/profile.jpg';

function AboutMe() {
    return (
        <section className='about-me' id='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__info'>
                <div className='about-me__description'>
                    <h3 className='about-me__student-name'>Айшат Сафин</h3>
                    <h4 className='about-me__student-specialization'>
                        Фронтенд-разработчик, 34 года
                    </h4>
                    <p className='about-me__student-info'>
                        Привет! Меня зовут Айшат, я фронтенд-разработчик из
                        Казани и я люблю создавать: музыку, танцы, хорошее
                        настроение. А еще я люблю создавать красивые и
                        интересные сайты. Понять это помог Яндекс.Практикум.
                        Давайте дружить и создавать что-то хорошее вместе?
                    </p>
                    <a
                        className='about-me__student-link'
                        href='https://github.com/homo-errantium'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Github
                    </a>
                </div>
                <img
                    src={profile}
                    alt='фото студента'
                    className='about-me__profile-photo'
                />
            </div>
        </section>
    );
}

export default AboutMe;
