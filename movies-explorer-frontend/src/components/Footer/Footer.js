import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer' id='footer'>
            <h3 className='footer__title'>
                Учебный проект Яндекс.Практикум х BeatFilm.
            </h3>
            <div className='footer__info'>
                <span className='footer__year'>&copy; 2023 Айшат Сафин</span>
                <div className='footer__links'>
                    <a
                        className='footer__link'
                        href='https://practicum.yandex.ru/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Яндекс.Практикум
                    </a>
                    <a
                        className='footer__link'
                        href='https://github.com/homo-errantium'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Github
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
