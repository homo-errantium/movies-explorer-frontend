const BASE_URL = 'https://api.my.films.nomoredomainsicu.ru';
// const BASE_URL = 'http://localhost:4000';

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`${res.status} ${res.statusText}`);
    }
}

export function register(name, password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            name: name,
            password: password,
            email: email,
        }),
    })
        .then((res) => res.json())
        .then((res) => console.log(res));
}

export function authorize(password, email) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            password: password,
            email: email,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return data;
        });
}

export function getUserData(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => data);
}

export function editUserData(token, name, email) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    })
        .then((res) => checkResponse(res))
        .then((data) => data);
}

export function getSavedMovies(token) {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    })
        .then((res) => checkResponse(res))
        .then((data) => data);
}

export function saveMovie(token, movie) {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: movie.image,
            trailer: movie.trailer,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: movie.thumbnail,
            movieId: movie.movieId,
        }),
    })
        .then((res) => checkResponse(res))
        .then((data) => data);
}

export function deleteMovie(token, movieId) {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    })
        .then((res) => checkResponse(res))
        .then((data) => data);
}
