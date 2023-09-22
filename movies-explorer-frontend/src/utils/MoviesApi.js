export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`${res.status} ${res.statusText}`);
    }
}

export function getMovies() {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => checkResponse(res));
}
