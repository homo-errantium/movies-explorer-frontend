import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <label
            htmlFor='search-form-toggle-input'
            className='search-form-toggle-label'
        >
            <input
                id='search-form-toggle-input'
                className='search-form-toggle-label__input'
                type='checkbox'
            ></input>
        </label>
    );
}

export default FilterCheckbox;
