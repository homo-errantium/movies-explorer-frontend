import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
    return (
        <div className='wrapper'>
            <Header loggedIn={props.loggedIn} />
            <main className='movies main' id='movies'>
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </div>
    );
}

export default Movies;
