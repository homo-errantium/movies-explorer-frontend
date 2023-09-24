import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies, filterDuration } from '../../utils/utils';

function SavedMovies({ loggedIn, savedMovies, onCardDelete }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    //submit
    function onSearchMovies(query) {
        setSearchQuery(query);
    }

    function handleShortMovies() {
        setIsShortMovies(!isShortMovies);
    }

    useEffect(() => {
        const moviesList = filterMovies(savedMovies, searchQuery);
        setFilteredMovies(
            isShortMovies ? filterDuration(moviesList) : moviesList
        );
    }, [savedMovies, isShortMovies, searchQuery]);

    useEffect(() => {
        if (filteredMovies.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [filteredMovies]);

    return (
        <div className='wrapper'>
            <Header loggedIn={loggedIn} main={false} />
            <main className='savedMovies' id='savedMovies'>
                <SearchForm
                    onSearchMovies={onSearchMovies}
                    onFilter={handleShortMovies}
                />
                <MoviesCardList
                    isNotFound={isNotFound}
                    isSavedFilms={true}
                    cards={filteredMovies}
                    savedMovies={savedMovies}
                    onCardDelete={onCardDelete}
                />
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
