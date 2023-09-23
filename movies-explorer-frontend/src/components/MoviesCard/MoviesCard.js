import React from 'react';
import './MoviesCard.css';
import { durationConverter } from '../../utils/utils';
import for_example from '../../images/for_example.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard({
    card,
    isSavedFilms,
    handleLikeClick,
    onCardDelete,
    saved,
    savedMovies,
}) {
    function onCardClick() {
        if (saved) {
            onCardDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
        } else {
            handleLikeClick(card);
        }
    }

    function onDelete() {
        onCardDelete(card);
    }

    return (
        <li className='card'>
            <a
                className='card__trailer-link'
                href={card.trailerLink}
                target='_blank'
                rel='noreferrer'
            >
                <img
                    className='card__image'
                    alt={card.nameRU}
                    src={
                        isSavedFilms
                            ? card.image
                            : `https://api.nomoreparties.co/${card.image.url}`
                    }
                />
            </a>

            <div className='card__info'>
                <h2 className='card__title'>{card.nameRU}</h2>

                {isSavedFilms ? (
                    <button
                        onClick={onDelete}
                        type='button'
                        className='card__delete-button'
                    ></button>
                ) : (
                    <button
                        type='button'
                        className={
                            saved ? 'card__active-button' : 'card__save-button'
                        }
                        onClick={onCardClick}
                    ></button>
                )}
            </div>
            <p className='card__duration'>{durationConverter(card.duration)}</p>
        </li>
    );
}

export default MoviesCard;
