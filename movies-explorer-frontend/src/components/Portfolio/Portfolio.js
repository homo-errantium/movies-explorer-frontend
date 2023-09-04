import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <nav className='portfolio__links'>
                <a
                    href='https://homo-errantium.github.io/how_to_study/'
                    className='portfolio__link portfolio__link_border-bottom'
                    target='_blank'
                    rel='noreferrer'
                >
                    <p className='portfolio__text'>Статичный сайт</p>
                    <img
                        className='portfolio__image'
                        src={arrow}
                        alt='стрелка на ссылку'
                    />
                </a>
                <a
                    href='https://homo-errantium.github.io/russian-travel/'
                    className='portfolio__link portfolio__link_border-bottom'
                    target='_blank'
                    rel='noreferrer'
                >
                    <p className='portfolio__text'>Адаптивный сайт</p>
                    <img
                        className='portfolio__image'
                        src={arrow}
                        alt='стрелка на ссылку'
                    />
                </a>
                <a
                    href='https://github.com/homo-errantium/react-mesto-api-full-gha/'
                    className='portfolio__link '
                    target='_blank'
                    rel='noreferrer'
                >
                    <p className='portfolio__text '>
                        Одностраничное приложение
                    </p>
                    <img
                        className='portfolio__image'
                        src={arrow}
                        alt='стрелка на ссылку'
                    />
                </a>
            </nav>
        </section>
    );
}

export default Portfolio;
