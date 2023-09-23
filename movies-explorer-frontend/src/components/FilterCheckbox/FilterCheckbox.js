import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onFilter, isShortMovies }) {
    return (
        <label
            htmlFor='search-form-toggle-input'
            className='search-form-toggle-label'
        >
            <input
                id='search-form-toggle-input'
                className='search-form-toggle-label__input'
                type='checkbox'
                onChange={onFilter}
                checked={isShortMovies}
            ></input>
        </label>
    );
}

export default FilterCheckbox;
