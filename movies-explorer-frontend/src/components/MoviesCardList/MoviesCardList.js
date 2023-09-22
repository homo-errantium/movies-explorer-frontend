import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
    const [initialCardsNumber, setInitialCardsNumber] = React.useState(() => {
        const windowSize = window.innerWidth;
        if (windowSize < 720) {
            return 5;
        } else if (windowSize < 920) {
            return 8;
        } else if (windowSize < 1279) {
            return 12;
        } else if (windowSize > 1279) {
            return 12;
        }
    });
    const [moreCardsNumber, setMoreCardsNumber] = React.useState(() => {
        const windowSize = window.innerWidth;
        if (windowSize < 720) {
            return 2;
        } else if (windowSize < 920) {
            return 2;
        } else if (windowSize < 1279) {
            return 3;
        } else if (windowSize > 1279) {
            return 4;
        }
    });

    function handleScreenWidth() {
        const windowSize = window.innerWidth;
        if (windowSize < 720) {
            setInitialCardsNumber(5);
        } else if (windowSize < 920) {
            setInitialCardsNumber(8);
        } else if (windowSize < 1279) {
            setInitialCardsNumber(12);
        } else if (windowSize > 1279) {
            setInitialCardsNumber(12);
        }
    }

    const displayedMovies = props.movies?.slice(0, initialCardsNumber);

    function handleMoviesIncrease() {
        setInitialCardsNumber((prevState) => {
            return prevState + moreCardsNumber;
        });
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleScreenWidth);
    }, []);

    return (
        <section className='movies-card-list'>
            {props.isSearching && <Preloader />}
            <span
                className={`movies__error ${
                    props.isErrorActive ? '' : 'movies__no-display'
                }`}
            >
                Во время запроса произошла ошибка. Возможно, проблема с
                соединением или сервер недоступен. Подождите немного и
                попробуйте ещё раз
            </span>
            <span
                className={`movies__not-found ${
                    props.notFound ? '' : 'movies__no-display'
                }`}
            >
                Ничего не найдено
            </span>
            <span
                className={`movies__no-saved ${
                    props.saved && props.movies.length === 0
                        ? ''
                        : 'movies__no-display'
                }`}
            >
                Вы пока что ничего не добавили в избранное
            </span>
            <ul className='movies-card-list__list'>
                {displayedMovies?.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            key={props.saved ? movie.movieId : movie.id}
                            saved={props.saved}
                            onMovieSave={props.onMovieSave}
                            onDeleteMovie={props.onDeleteMovie}
                            savedMovies={props.savedMovies}
                        />
                    );
                })}
            </ul>
            <button
                type='button'
                className={
                    props.saved
                        ? 'movies-card-list__more-button movies-card-list__more-button_invisible'
                        : `movies-card-list__more-button ${
                              props.movies?.length === displayedMovies?.length
                                  ? 'movies-card-list__more-button_invisible'
                                  : ''
                          }`
                }
                onClick={handleMoviesIncrease}
            >
                Ещё
            </button>
        </section>
    );
}

export default MoviesCardList;
