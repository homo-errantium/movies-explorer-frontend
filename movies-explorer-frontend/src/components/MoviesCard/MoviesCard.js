import React from 'react';
import './MoviesCard.css';
import forExample from '../../images/for_example.jpg'; //delete after connection to DB

function MoviesCard() {
    return (
        <li className='movieCard'>
            <a
                className='movieCard__trailer-link'
                href='ya.ru'
                target='_blank'
                rel='noreferrer'
            >
                <img
                    className='movieCard__image'
                    alt='постер к фильму'
                    src={forExample}
                />
            </a>

            <div className='movieCard__info'>
                <p className='movieCard__title'>Название фильма</p>

                {false ? (
                    <button
                        type='button'
                        className='movieCard__delete-button'
                    ></button>
                ) : (
                    <button
                        type='button'
                        className='movieCard__save-button'
                    ></button>
                )}
            </div>
            <p className='movieCard__duration'>1ч 33м</p>
        </li>
    );
}

export default MoviesCard;
