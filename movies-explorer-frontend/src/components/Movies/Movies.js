import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <SearchForm />
            <main className='movies' id='movies' role='main'>
                <MoviesCardList />
            </main>
            <Footer />
        </>
    );
}

export default Movies;
