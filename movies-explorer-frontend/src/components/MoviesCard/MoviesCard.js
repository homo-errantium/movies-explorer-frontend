import React from 'react';
import './MoviesCard.css';
import { durationConverter } from '../../utils/utils';

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
        <li className='movieCard'>
            <a
                className='movieCard__trailer-link'
                href={card.trailerLink}
                target='_blank'
                rel='noreferrer'
            >
                <img
                    className='movieCard__image'
                    alt={card.nameRU}
                    src={
                        isSavedFilms
                            ? card.image
                            : `https://api.nomoreparties.co/${card.image.url}`
                    }
                />
            </a>

            <div className='movieCard__info'>
                <h2 className='movieCard__title'>{card.nameRU}</h2>

                {isSavedFilms ? (
                    <button
                        onClick={onDelete}
                        type='button'
                        className='movieCard__delete-button'
                    ></button>
                ) : (
                    <button
                        type='button'
                        className={
                            saved
                                ? 'movieCard__active-button'
                                : 'movieCard__save-button'
                        }
                        onClick={onCardClick}
                    ></button>
                )}
            </div>
            <p className='movieCard__duration'>
                {durationConverter(card.duration)}
            </p>
        </li>
    );
}

export default MoviesCard;
