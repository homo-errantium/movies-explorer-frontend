import React from 'react';
import './MoviesCard.css';
import forExample from '../../images/for_example.jpg'; //delete after connection to DB

function MoviesCard(props) {
    return (
        <li className='movie-card'>
            <a
                className='movie-card__trailer-link'
                href='ya.ru'
                target='_blank'
                rel='noreferrer'
            >
                <img
                    className='movie-card__image'
                    alt={props.movieName}
                    src={forExample}
                />
            </a>

            <div className='movie-card__info'>
                <h2 className='movie-card__title'>Название фильма</h2>

                {true ? (
                    <button
                        type='button'
                        className='movie-card__delete-button'
                    ></button>
                ) : (
                    <button
                        type='button'
                        className={`movie-card__save-button ${
                            true ? 'movie-card__active-button' : ''
                        }`}
                    ></button>
                )}
            </div>
            <p className='movie-card__duration'>1ч 33м</p>
        </li>
    );
}

export default MoviesCard;
