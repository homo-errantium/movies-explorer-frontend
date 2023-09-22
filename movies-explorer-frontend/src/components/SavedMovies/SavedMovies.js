import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} main={false} />
            <main className='savedMovies' id='savedMovies'>
                <SearchForm
                    onSearchSavedMovies={props.onSearchSavedMovies}
                    saved={true}
                    onShortMoviesCheck={props.onShortMoviesCheck}
                    isChecked={props.isShortMoviesChecked}
                />
                <MoviesCardList
                    saved={true}
                    movies={props.movies}
                    onDeleteMovie={props.onDeleteMovie}
                />
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
