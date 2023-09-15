import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <form className='search-form__toggle-form'>
            <input
                className='search-form__toggle-input'
                type='checkbox'
            ></input>
        </form>
    );
}

export default FilterCheckbox;
