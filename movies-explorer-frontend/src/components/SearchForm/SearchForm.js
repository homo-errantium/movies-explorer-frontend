import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
    const [search, setSearch] = React.useState('');
    const [isSearchValid, setIsSearchValid] = React.useState(true);

    function handleSearchChange(e) {
        setSearch(e.target.value);
        setIsSearchValid(e.target.checkValidity());
    }

    function handleSearchSavedMovies(e) {
        e.preventDefault();
        props.onSearchSavedMovies(search);
    }

    function handleSearchMovies(e) {
        e.preventDefault();
        props.onSearchMovies(search);
    }
    return (
        <div className='searchForm' id='searchForm'>
            <form
                className='searchForm__form'
                onSubmit={
                    props.saved ? handleSearchSavedMovies : handleSearchMovies
                }
            >
                <fieldset className='searchForm__field'>
                    <label
                        className='searchForm__label'
                        htmlFor='searchForm-input'
                    ></label>
                    <input
                        // ref={ref}
                        className='searchForm__input'
                        id='searchForm-input'
                        type='text'
                        name='search'
                        value={search || ''}
                        onChange={handleSearchChange}
                        placeholder='Фильм'
                        required
                    />
                    <span
                        className={`searchForm__error ${
                            isSearchValid ? 'searchForm__error_hidden' : ''
                        }`}
                    >
                        Нужно ввести ключевое слово
                    </span>
                </fieldset>

                <button className='searchForm__button' type='submit'>
                    <span className='searchForm__button-text'>Найти</span>
                </button>
                <div className='searchForm__toggle-box'>
                    <FilterCheckbox
                        onChange={props.onShortMoviesCheck}
                        isChecked={props.isChecked}
                    />
                    <h3 className='searchForm__toggle-title'>
                        Короткометражки
                    </h3>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
