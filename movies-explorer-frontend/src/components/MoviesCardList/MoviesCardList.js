import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {
    SHOW_MORE_DECKTOP,
    SHOW_MORE_TABLET,
    SHOW_MORE_MOBILE,
} from '../../utils/constants';

function MoviesCardList({
    cards,
    isSavedFilms,
    isLoading,
    isReqErr,
    isNotFindMovies,
    handleLikeClick,
    savedMovies,
    onCardDelete,
}) {
    const [shownMovies, setShownMovies] = useState(0);
    const { pathname } = useLocation();

    function shownCount() {
        const display = window.innerWidth;
        if (display > 1180) {
            setShownMovies(16);
        } else if (display > 1023) {
            setShownMovies(12);
        } else if (display > 800) {
            setShownMovies(8);
        } else if (display < 800) {
            setShownMovies(5);
        }
    }

    useEffect(() => {
        shownCount();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('resize', shownCount);
        }, 500);
    });

    function showMore() {
        const display = window.innerWidth;
        if (display > 1180) {
            setShownMovies(shownMovies + SHOW_MORE_DECKTOP);
        } else if (display > 1023) {
            setShownMovies(shownMovies + SHOW_MORE_TABLET);
        } else if (display < 1023) {
            setShownMovies(shownMovies + SHOW_MORE_MOBILE);
        }
    }

    function getSavedMovieCard(savedMovies, card) {
        return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
    }

    return (
        <section className='movies-card-list'>
            {isLoading && <Preloader />}
            {isNotFindMovies && !isLoading && (
                <p className='movies-card-list__search-error'>
                    Ничего не найдено
                </p>
            )}
            {isReqErr && !isLoading && (
                <p className='movies-card-list__search-error'>
                    Во время запроса произошла ошибка. Возможно, проблема с
                    соединением или сервер недоступен. Подождите немного и
                    попробуйте ещё раз
                </p>
            )}
            {!isLoading && !isReqErr && !isNotFindMovies && (
                <>
                    {pathname === '/saved-movies' ? (
                        <>
                            <ul className='movies-card-list__list'>
                                {cards.map((card) => (
                                    <MoviesCard
                                        key={isSavedFilms ? card._id : card.id}
                                        saved={getSavedMovieCard(
                                            savedMovies,
                                            card
                                        )}
                                        cards={cards}
                                        card={card}
                                        isSavedFilms={isSavedFilms}
                                        handleLikeClick={handleLikeClick}
                                        onCardDelete={onCardDelete}
                                        savedMovies={savedMovies}
                                    />
                                ))}
                            </ul>
                            <div className='movies-card-list__button-container'></div>
                        </>
                    ) : (
                        <>
                            <ul className='movies-card-list__list'>
                                {cards.slice(0, shownMovies).map((card) => (
                                    <MoviesCard
                                        key={isSavedFilms ? card._id : card.id}
                                        saved={getSavedMovieCard(
                                            savedMovies,
                                            card
                                        )}
                                        cards={cards}
                                        card={card}
                                        isSavedFilms={isSavedFilms}
                                        handleLikeClick={handleLikeClick}
                                        onCardDelete={onCardDelete}
                                        savedMovies={savedMovies}
                                    />
                                ))}
                            </ul>
                            <div className='movies-card-list__button-container'>
                                {cards.length > shownMovies ? (
                                    <button
                                        className='movies-card-list__button'
                                        onClick={showMore}
                                    >
                                        Ещё
                                    </button>
                                ) : (
                                    ''
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </section>
    );
}

export default MoviesCardList;
