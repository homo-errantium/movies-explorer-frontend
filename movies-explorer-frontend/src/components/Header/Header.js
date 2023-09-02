import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
    return (
        <header className='header'>
            <Link className='header__logo' to='/'>
                <img className='header__logo' src={logo} alt='Логотип сайта' />
            </Link>
            <Navigation loggedIn={props.loggedIn} />
        </header>
    );
}

export default Header;
