import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <main className='not-found' role='main'>
            <h1 className='not-found__title'>404</h1>
            <p className='not-found__description'>Страница не найдена</p>
            <Link to='/' className='not-found__back-link'>
                Назад
            </Link>
        </main>
    );
}

export default NotFound;
