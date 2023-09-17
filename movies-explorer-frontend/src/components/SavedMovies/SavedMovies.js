import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return (
        <>
            <Header />
            <SearchForm />
            <main className='savedMovies' id='savedMovies' role='main'>
                <MoviesCardList />
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
