import React from 'react';
import './MoviesCard.css';
import for_example from '../../images/for_example.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
    const [isDeleteButtonVisible, setIsDeleteButtonVisible] =
        React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);

    const movie = {
        country: props.movie.country || 'Не указано',
        director: props.movie.director || 'Не указано',
        duration: props.movie.duration || 0,
        year: props.movie.year || 'Не указано',
        description: props.movie.description || 'Не указано',
        image: `${
            props.movie.image === null
                ? `${for_example}`
                : `https://api.nomoreparties.co${props.movie.image?.url}`
        }`,
        trailer: props.movie?.trailerLink,
        nameRU: props.movie.nameRU || 'Не указано',
        nameEN: props.movie.nameEN || 'Не указано',
        thumbnail: `${
            props.movie.image === null
                ? `${for_example}`
                : `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`
        }`,
        movieId: props.movie.id,
    };

    const editedDuration = `${Math.trunc(movie.duration / 60)}ч${
        movie.duration % 60
    }м`;
    const image = `${
        props.movie.image === null
            ? `${for_example}`
            : `https://api.nomoreparties.co${props.movie.image?.url}`
    }`;
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const currentMovie = savedMovies.find(
        (movie) => movie.nameRU === props.movie.nameRU
    );

    const location = useLocation();

    function handleCardMouseOver() {
        setIsDeleteButtonVisible(true);
    }

    function handleCardMouseOut() {
        setIsDeleteButtonVisible(false);
    }

    function handleLikeButtonCLick() {
        props.onMovieSave(movie);
        setIsSaved(true);
    }

    function handleDisLike() {
        setIsSaved(false);
        console.log(currentMovie);
        props.onDeleteMovie(currentMovie._id);
    }

    function handleDeleteMovie() {
        props.onDeleteMovie(props.movie._id);
        setIsSaved(false);
    }

    React.useEffect(() => {
        if (currentMovie) {
            setIsSaved(true);
        }
    }, [currentMovie, location]);

    return (
        <li className='movie-card'>
            <a
                className='movie-card__trailer-link'
                href={
                    props.saved ? props.movie.trailer : props.movie.trailerLink
                }
                target='_blank'
                rel='noreferrer'
            >
                <img
                    className='movie-card__image'
                    alt={props.movie.nameRU}
                    src={props.saved ? props.movie.image : image}
                />
            </a>

            <div
                className='movie-card__info'
                onMouseEnter={handleCardMouseOver}
                onMouseLeave={handleCardMouseOut}
            >
                <h2 className='movie-card__title'>{props.movie.nameRU}</h2>

                {props.saved ? (
                    <button
                        onClick={handleDeleteMovie}
                        type='button'
                        className={`movie-card__delete-button ${
                            isDeleteButtonVisible
                                ? 'movie-card__delete-button_visible'
                                : ''
                        }`}
                    ></button>
                ) : (
                    <button
                        type='button'
                        className={`movie-card__save-button ${
                            isSaved ? 'movie-card__active-button' : ''
                        }`}
                        onClick={
                            isSaved ? handleDisLike : handleLikeButtonCLick
                        }
                    ></button>
                )}
            </div>
            <p className='movie-card__duration'>{editedDuration}</p>
        </li>
    );
}

export default MoviesCard;
