import './Footer.css';

function Footer() {
    return (
        <footer className='footer' id='footer'>
            <h3 className='footer__title'>
                Учебный проект Яндекс.Практикум х BeatFilm.
            </h3>
            <div className='footer__info'>
                <span className='footer__year'>&copy; 2023</span>
                <ul className='footer__links'>
                    <li className='footer__item'>
                        <a
                            className='footer__link'
                            href='https://practicum.yandex.ru/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className='footer__item'>
                        <a
                            className='footer__link'
                            href='https://github.com/homo-errantium'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
