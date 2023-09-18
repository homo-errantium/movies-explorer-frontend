import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} />
            <SearchForm />
            <main className='movies main' id='movies' role='main'>
                <MoviesCardList />
            </main>
            <Footer />
        </div>
    );
}

export default Movies;
