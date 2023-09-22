import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
        <label
            htmlFor='search-form-toggle-input'
            className='search-form-toggle-label'
        >
            <input
                id='search-form-toggle-input'
                className='search-form-toggle-label__input'
                type='checkbox'
                onChange={props.onChange}
                checked={props.isChecked}
            ></input>
        </label>
    );
}

export default FilterCheckbox;
