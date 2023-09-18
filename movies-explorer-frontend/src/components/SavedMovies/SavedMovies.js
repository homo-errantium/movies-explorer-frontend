import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} />
            <SearchForm />
            <main className='savedMovies' id='savedMovies' role='main'>
                <MoviesCardList />
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
