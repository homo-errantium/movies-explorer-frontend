import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies, filterDuration } from '../../utils/utils';
import * as moviesApi from '../../utils/MoviesApi';

function Movies({ loggedIn, handleLikeClick, savedMovies, onCardDelete }) {
    const [allFindedMovies, setAllFindedMovies] = useState([]); //все найденные фильмы
    const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные фильмы
    const [isShortMovies, setIsShortMovies] = useState(false); //короткометражки?
    const [isLoading, setIsLoading] = useState(false);

    const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса
    const [isNotFindMovies, setIsNotFindMovies] = useState(false); //фильмы не найдены

    //основнай запрос
    function handleFilterMovies(movies, query, short) {
        const moviesList = filterMovies(movies, query, short); //стягиваем фильмы из локального хранилища
        setAllFindedMovies(moviesList); //сохраняем
        setFilteredMovies(short ? filterDuration(moviesList) : moviesList); //фильтрация по продолжительности
        localStorage.setItem('movies', JSON.stringify(moviesList)); // возвращаем фильмы в локалное хранилище
        localStorage.setItem('allMovies', JSON.stringify(movies));
    }

    //запрос на короткометражки
    function handleShortMovies() {
        setIsShortMovies(!isShortMovies);
        if (!isShortMovies) {
            if (filterDuration(allFindedMovies).length === 0) {
                setFilteredMovies(filterDuration(allFindedMovies));
            } else {
                setFilteredMovies(filterDuration(allFindedMovies));
            }
        } else {
            setFilteredMovies(allFindedMovies);
        }
        localStorage.setItem('shortMovies', !isShortMovies);
    }

    function onSearchMovies(query) {
        console.log(query);

        localStorage.setItem('movieSearch', query);
        localStorage.setItem('shortMovies', isShortMovies);

        if (localStorage.getItem('allMovies')) {
            const movies = JSON.parse(localStorage.getItem('allMovies'));
            handleFilterMovies(movies, query, isShortMovies);
        } else {
            setIsLoading(true);
            moviesApi
                .getCards()
                .then((cardsData) => {
                    handleFilterMovies(cardsData, query, isShortMovies);
                    setIsReqErr(false);
                })
                .catch((err) => {
                    setIsReqErr(true);
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        if (localStorage.getItem('shortMovies') === 'true') {
            setIsShortMovies(true);
        } else {
            setIsShortMovies(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movies')) {
            const movies = JSON.parse(localStorage.getItem('movies'));
            setAllFindedMovies(movies);
            if (localStorage.getItem('shortMovies') === 'true') {
                setFilteredMovies(filterDuration(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movieSearch')) {
            if (filteredMovies.length === 0) {
                setIsNotFindMovies(true);
            } else {
                setIsNotFindMovies(false);
            }
        } else {
            setIsNotFindMovies(false);
        }
    }, [filteredMovies]);

    return (
        <div className='wrapper'>
            <Header loggedIn={loggedIn} isMain={false} />
            <main className='movies main' id='movies'>
                <SearchForm
                    onSearchMovies={onSearchMovies}
                    onFilter={handleShortMovies}
                    isShortMovies={isShortMovies}
                />
                <MoviesCardList
                    savedMovies={savedMovies}
                    cards={filteredMovies}
                    isSavedFilms={false}
                    isLoading={isLoading}
                    isReqErr={isReqErr}
                    isNotFindMovies={isNotFindMovies}
                    handleLikeClick={handleLikeClick}
                    onCardDelete={onCardDelete}
                />
            </main>
            <Footer />
        </div>
    );
}

export default Movies;
