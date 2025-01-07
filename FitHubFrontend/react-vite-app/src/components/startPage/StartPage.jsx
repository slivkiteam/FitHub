import { useEffect, useState } from 'react';
import Training from '../trainings/Training';
import './style.css';

export default function StartPage({ onTypeChange }) {
    const [topTrainings, setTopTrainings] = useState([]); // Состояние для топ-тренировок
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    useEffect(() => {
        // Функция для загрузки данных с сервера
        const fetchTopTrainings = async () => {
            try {
                const response = await fetch('http://localhost:8081/trains/top');
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`); // Обработка ошибок HTTP
                }
                const data = await response.json(); // Преобразование ответа в JSON
                setTopTrainings(data); // Сохраняем данные в состояние
            } catch (err) {
                setError(err.message); // Сохраняем сообщение об ошибке
            } finally {
                setIsLoading(false); // Завершаем загрузку
            }
        };

        fetchTopTrainings(); // Вызываем функцию для загрузки данных
    }, []);

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
                    <div className="training-button">
                        <a href="#" onClick={() => onTypeChange('createTraining')}>
                            быстрая тренировка
                        </a>
                    </div>
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
                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : error ? (
                        <p className="error-text">Ошибка: {error}</p>
                    ) : topTrainings.length > 0 ? (
                        <ul className="training-cards">
                            {topTrainings.slice(0, 3).map((training) => (
                                <Training training={training} key={training.id} />
                            ))}
                        </ul>
                    ) : (
                        <p>Нет доступных тренировок</p>
                    )}
                </div>
            </section>
            <section className="information-desktop">
                <div className="information-wrapper">
                    <p className="information-text">информация</p>
                </div>
                <div className="information-block">
                    <img src="./src/img/info1.svg" alt="info1" />
                    <img src="./src/img/info2.svg" alt="info2" style={{ width: '580px' }} />
                </div>
            </section>
        </>
    );
}
