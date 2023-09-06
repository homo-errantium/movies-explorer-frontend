import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <secction className='searchForm' id='searchForm'>
            <form className='searchForm__form'>
                <fieldset className='searchForm__field'>
                    <label
                        className='searchForm__label'
                        htmlFor='searchForm-input'
                    ></label>
                    <input
                        // ref={ref}
                        className='searchForm__input'
                        id='searchForm__input'
                        type='text'
                        name='search'
                        // value={'Фильм' || ''}
                        placeholder='Фильм'
                    />
                </fieldset>
                <button className='searchForm__button' type='submit'>
                    <span className='searchForm__button-text'>Найти</span>
                </button>
                <div className='searchForm__toggle-box'>
                    <FilterCheckbox />
                    <h3 className='searchForm__toggle-title'>
                        Короткометражки
                    </h3>
                </div>
            </form>
            <hr className='searchFrom__line' />
        </secction>
    );
}

export default SearchForm;
