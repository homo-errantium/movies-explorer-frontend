import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project' id='about-project'>
            <h2 className='about-project__title'>О проекте</h2>
            <div className='about-project__main-info'>
                <div className='about-project__main-info-item'>
                    <h3 className='about-project__main-info-title'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='about-project__main-info-description'>
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className='about-project__main-info-item'>
                    <h3 className='about-project__main-info-title'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='about-project__main-info-description'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые
                        нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className='about-project__time-info'>
                <h3 className='about-project__time-info-title about-project__time-info-title_type_green'>
                    1 неделя
                </h3>
                <h3 className='about-project__time-info-title'>4 недели</h3>
                <p className='about-project__time-info-description'>Back-end</p>
                <p className='about-project__time-info-description'>
                    Front-end
                </p>
            </div>
        </section>
    );
}

export default AboutProject;
