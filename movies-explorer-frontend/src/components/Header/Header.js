import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
    return (
        /*цвет шапки*/
        <header className={true ? 'header' : 'header header_type_black'}>
            <Link className='header__logo' to='/'>
                <img className='header__logo' src={logo} alt='Логотип сайта' />
            </Link>
            <Navigation />
        </header>
    );
}

export default Header;
