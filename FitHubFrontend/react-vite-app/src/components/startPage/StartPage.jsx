import { useEffect, useState } from 'react';
import Training from '../trainings/Training';
import './style.css';

export default function StartPage({ data, onTypeChange }) {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Проверяем, есть ли данные, и обновляем состояние
        if (data?.content) {
            setFilteredData(data.content);
        }
    }, [data]);

    return (
        <>
            <section className="promo-desktop">
                <div className="block1">
                    <p className="first-level">БОЛЕЕ <span className="dark-green-text">100</span> ТРЕНИРОВОК</p>
                    <p className="second-level">ДЛЯ ДУШИ И ТЕЛА</p>
                </div>
                <div className="man">
                    <img src="./src/img/man.png" alt="Man" />
                </div>
                <div className="first-column-second-row">
                    {/* Кнопка быстрая тренировка */}
                    <div className="training-button">
                        <a href="#" onClick={() => onTypeChange('createTraining')}>
                            быстрая тренировка
                        </a>
                    </div>
                    {/* Кнопка мои тренировки */}
                    <div className="training-button">
                        <a href="#" onClick={() => onTypeChange('trainings')}>
                            мои тренировки
                        </a>
                    </div>
                </div>
            </section>
            <section className="top-trainings-desktop">
                <div className="top-trainings-wrapper">
                    <p className="top-trainings-text">попробуйте наши лучшие <span className="green-text">тренировки</span></p>
                </div>
                <div className="training-cards-container">
                    <ul className="training-cards">
                        {filteredData?.length > 0
                            ? filteredData.slice(0, 3).map((training) => (
                                <Training training={training} key={training.id} />
                            ))
                            : <p>Нет доступных тренировок</p>
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}
