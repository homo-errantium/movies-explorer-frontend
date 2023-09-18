import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} />
            <main className='savedMovies' id='savedMovies'>
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
