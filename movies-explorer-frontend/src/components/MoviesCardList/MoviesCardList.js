import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {
    COLUMN_X1,
    COLUMN_X2,
    COLUMN_X3,
    COLUMN_X4,
    WIDTH_DECKTOP_LARGE,
    WIDTH_DECKTOP,
    WIDTH_TABLET_LANDSCAPE,
    WIDTH_MOBILE_LARGE,
    WIDTH_MOBILE,
    BUTTON_MORE_DECKTOP,
    BUTTON_MORE_TABLET,
    BUTTON_MORE_MOBILE,
} from '../../utils/constants';
import {
    ERRORTEXT_MOVIES_SMTHNG_WRONG,
    ERRORTEXT_NOT_FIND_NTHNG,
} from '../../utils/errorText';

function MoviesCardList({
    noResetCountMovies,
    isReSearch,
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
        if (isReSearch) {
            setShownMovies(0);
        }
        const display = window.innerWidth;
        if (display > WIDTH_DECKTOP_LARGE) {
            setShownMovies(COLUMN_X4);
        } else if (display > WIDTH_DECKTOP) {
            setShownMovies(COLUMN_X4);
        } else if (display > WIDTH_TABLET_LANDSCAPE) {
            // > 700
            setShownMovies(COLUMN_X3);
        } else if (display > WIDTH_MOBILE_LARGE) {
            setShownMovies(COLUMN_X2);
        } else if (display < WIDTH_MOBILE) {
            setShownMovies(COLUMN_X1);
        }
        noResetCountMovies();
    }

    useEffect(() => {
        shownCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReSearch]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('resize', shownCount);
        }, 500);
    });

    function showMore() {
        const display = window.innerWidth;
        if (display > 801) {
            setShownMovies(shownMovies + BUTTON_MORE_DECKTOP);
        } else if (display > 700) {
            setShownMovies(shownMovies + BUTTON_MORE_TABLET);
        } else if (display < 701) {
            setShownMovies(shownMovies + BUTTON_MORE_MOBILE);
        } else if (display < 480) {
            setShownMovies(shownMovies + BUTTON_MORE_MOBILE);
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
                    {ERRORTEXT_NOT_FIND_NTHNG}
                </p>
            )}
            {isReqErr && !isLoading && (
                <p className='movies-card-list__search-error'>
                    {ERRORTEXT_MOVIES_SMTHNG_WRONG}
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
