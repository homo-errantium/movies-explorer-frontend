import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList() {
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list__list'>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
            <button
                type='button'
                className={
                    true
                        ? 'movies-card-list__more-button'
                        : 'movies-card-list__more-button movies-card-list__more-button_invisible'
                }
            >
                Ещё
            </button>
        </section>
    );
}

export default MoviesCardList;
