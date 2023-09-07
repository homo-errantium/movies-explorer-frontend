import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList() {
    return (
        <section className='moviesCardList'>
            <ul className='moviesCardList__list'>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
            <button className={'moviesCardList__more-button'}>Ещё</button>
        </section>
    );
}

export default MoviesCardList;
