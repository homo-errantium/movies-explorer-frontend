import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
    const [isQueryError, setIsQueryError] = useState(false);
    const [query, setQuery] = useState('');
    const location = useLocation();

    function handleChangeQuery(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim().length === 0) {
            setIsQueryError(true);
        } else {
            setIsQueryError(false);
            onSearchMovies(query);
        }
    }

    useEffect(() => {
        if (
            location.pathname === '/movies' &&
            localStorage.getItem('movieSearch')
        ) {
            const localQuery = localStorage.getItem('movieSearch');
            setQuery(localQuery);
        }
    }, [location]);

    return (
        <div className='searchForm' id='searchForm'>
            <form className='searchForm__form' onSubmit={handleSubmit}>
                <fieldset className='searchForm__field'>
                    <label
                        className='searchForm__label'
                        htmlFor='searchForm-input'
                    ></label>
                    <input
                        className='searchForm__input'
                        id='searchForm-input'
                        type='text'
                        name='search'
                        value={query || ''}
                        onChange={handleChangeQuery}
                        placeholder='Фильм'
                        required
                    />
                    {/* <span
                        className={`searchForm__error ${
                            isSearchValid ? 'searchForm__error_hidden' : ''
                        }`}
                    >
                        Нужно ввести ключевое слово
                    </span> */}
                </fieldset>

                <button className='searchForm__button' type='submit'>
                    <span className='searchForm__button-text'>Найти</span>
                </button>
                <div className='searchForm__toggle-box'>
                    <FilterCheckbox
                        onFilter={onFilter}
                        isShortMovies={isShortMovies}
                    />
                    {isQueryError && (
                        <span className='searchForm__error'>
                            Нужно ввести ключевое слово
                        </span>
                    )}
                    <h3 className='searchForm__toggle-title'>
                        Короткометражки
                    </h3>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
