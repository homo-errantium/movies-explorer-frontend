import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} isMain={false} />
            <main className='movies main' id='movies'>
                <SearchForm
                    onSearchMovies={props.onSearchMovies}
                    onShortMoviesCheck={props.onShortMoviesCheck}
                    saved={false}
                    isChecked={props.isShortMoviesChecked}
                />
                <MoviesCardList
                    movies={props.movies}
                    isSearching={props.isSearching}
                    notFound={props.notFound}
                    isErrorActive={props.isErrorActive}
                    onMovieSave={props.onMovieSave}
                    onDeleteMovie={props.onDeleteMovie}
                    saved={false}
                    savedMovies={props.savedMovies}
                    isMobile={props.isMobile}
                    isTablet={props.isTablet}
                />
            </main>
            <Footer />
        </div>
    );
}

export default Movies;
