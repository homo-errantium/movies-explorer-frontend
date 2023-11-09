import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const navigate = useNavigate();
    return (
        <main className='not-found'>
            <h1 className='not-found__title'>404</h1>
            <p className='not-found__description'>Страница не найдена</p>
            <Link
                to='/'
                className='not-found__back-link'
                onClick={() => navigate(-3)}
            >
                Назад
            </Link>
        </main>
    );
}

export default NotFound;
