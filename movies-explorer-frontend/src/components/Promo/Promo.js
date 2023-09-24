import promoLogo from '../../images/promo-logo.svg';
import './Promo.css';

function Promo() {
    return (
        <section className='promo' id='promo'>
            <h1 className='promo__title'>
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img
                className='promo__image'
                src={promoLogo}
                alt='Логотип промо-секции'
            />
        </section>
    );
}

export default Promo;
