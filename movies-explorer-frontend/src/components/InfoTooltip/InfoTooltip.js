import React from 'react';
import './InfoTooltip.css';
import logoGood from '../../images/logoGood.svg';
import logoBad from '../../images/logoBad.svg';

function InfoTooltip({
    onClose,
    isUpdate,
    isRegForm,
    isProfileForm,
    isRegistred,
}) {
    return (
        <div
            className={`popup ${
                isRegForm || isProfileForm ? 'popup_opened' : ''
            }`}
        >
            <div className='popup__container'>
                <button
                    id='success-close-button'
                    type='button'
                    className='popup__close-button'
                    onClick={onClose}
                />
                {isRegForm && isRegistred && (
                    <>
                        {' '}
                        <img
                            className='popup__signup-image'
                            src={logoGood}
                            alt='логотип успешной регистрации'
                        />
                        <h2 className='popup__signup-title'>
                            Регистрация прошла успешно
                        </h2>
                    </>
                )}
                {isRegForm && !isRegistred && (
                    <>
                        {' '}
                        <img
                            className='popup__signup-image'
                            src={logoBad}
                            alt='логотип неуспешной регистрации'
                        />
                        <h2 className='popup__signup-title'>
                            Что-то пошло не так! Попробуйте ещё раз.
                        </h2>
                    </>
                )}

                {isProfileForm && isUpdate && (
                    <>
                        <img
                            className='popup__signup-image'
                            src={logoGood}
                            alt='логотип успешного редактирования'
                        />
                        <h2 className='popup__signup-title'>
                            Редактирование прошло успешно
                        </h2>
                    </>
                )}

                {isProfileForm && !isUpdate && (
                    <>
                        {' '}
                        <img
                            className='popup__signup-image'
                            src={logoBad}
                            alt='логотип неуспешного редактирования'
                        />
                        <h2 className='popup__signup-title'>
                            Что-то пошло не так! Попробуйте ещё раз.
                        </h2>
                    </>
                )}
            </div>
        </div>
    );
}

export default InfoTooltip;

// import React from 'react';
// import './InfoTooltip.css';
// import logoGood from '../../images/logoGood.svg';
// import logoBad from '../../images/logoBad.svg';

// function InfoTooltip({ onClose, isSuccess, isUpdate }) {
//     return (
//         <div className={`popup ${!isSuccess ? 'popup_opened' : ''}`}>
//             <div className='popup__container'>
//                 <button
//                     id='success-close-button'
//                     type='button'
//                     className='popup__close-button'
//                     onClick={onClose}
//                 />
//                 <img
//                     className='popup__signup-image'
//                     src={logoBad}
//                     alt='Что-то пошло не так'
//                 />
//                 <h2 className='popup__signup-title'>{`${
//                     isUpdate
//                         ? 'Редактирование прошло успешно!'
//                         : 'Что-то пошло не так! Попробуйте ещё раз.'
//                 }`}</h2>
//             </div>
//         </div>
//     );
// }

// export default InfoTooltip;
