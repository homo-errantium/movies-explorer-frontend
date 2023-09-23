import { checkResponse } from './utils';

export const BASE_URL = 'https://api.my.films.nomoredomainsicu.ru';

export function getCards() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => checkResponse(res));
}
