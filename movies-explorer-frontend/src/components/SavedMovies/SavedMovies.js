import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return (
        <section className='savedMovies' id='savedMovies  '>
            <Header />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    );
}

export default SavedMovies;
