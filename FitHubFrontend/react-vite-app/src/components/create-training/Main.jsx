import Exercise from '../exercise/Exercise';
import './css/Main.css';
import MainDesktopHeader from './MainDesktopHeader';
import { useState, useEffect } from 'react';

export default function MainCreateTraining({ selectedTags, setSelectedTags }) {

    const [exercises, setExercises] = useState({})
    const token = localStorage.getItem('jwtToken')
    let dif;
    let time;


    const handleTagClick = (category, tag) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [category]: prevSelectedTags[category] === tag ? null : tag
        }));
    };

    const handleGenerateTraining = async () => {
        if (selectedTags.difficulty.toUpperCase() === "СЛОЖНАЯ"){
            dif = "СЛОЖНО"
        }
        if (selectedTags.difficulty.toUpperCase() === "СРЕДНЯЯ"){
            dif = "СРЕДНЕ"
        }
        if (selectedTags.difficulty.toUpperCase() === "ЛЕГКАЯ"){
            dif = "ЛЕГКО"
        }
        if (selectedTags.time.toUpperCase() === "1 ЧАС +"){
            time = "1 ЧАС +"
        }
        if (selectedTags.time.toUpperCase() === "10-15 МИН"){
            time = "10-15 МИНУТ"
        }
        if (selectedTags.time.toUpperCase() === "30-60 МИН"){
            time = "30-60 МИНУТ"
        }

        const selectedTagsAssistant = {
            "время": time,
            "тип тренировки": selectedTags.trainingType.toUpperCase(),
            "уровень сложности": dif.toUpperCase(),
            "формат": selectedTags.format.toUpperCase()
        }
        console.log(`Теги для ассистента:`, selectedTagsAssistant)
        console.log(`Токен в создании тренировки ${token}`)
        if (Object.values(selectedTags).includes(null)) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/assistant/generate`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedTagsAssistant),
            });
        
            if (!response.ok) { // Проверка успешности запроса
                throw new Error(`Ошибка: ${response.status}`);
            }
        
            const data = await response.json(); // Получение данных ответа
            localStorage.setItem(`exercises`, JSON.stringify(data.exercises))
            setExercises(data.exercises)
            console.log('Все получилось:', data.exercises);
        } catch (error) {
            console.error('Ошибка при запросе:', error.message);
        }        

        console.log('Тренировка сгенерирована с параметрами:', selectedTags);
        // Здесь можно добавить логику для дальнейшей работы с данными
    };

    return (
        <main className="main">
            <MainDesktopHeader selectedTags={selectedTags} />
            <div className="settings-desktop">
                <div className="training-settings-container">
                <div className="settings-desktop__structure">
                    <p className="page-text">Состав тренировки:</p>
                    <div className="exers">
                        {Object.keys(exercises).length > 0 ? (
                            Object.values(exercises).map((exercise, index) => (
                                <Exercise key={index} exer={exercise} />
                            ))
                        ) : (
                            <p className="page-text">Упражнения пока не сгенерированы.</p>
                        )}
                    </div>
                </div>
                    <div className="settings-desktop_params">
                        <p className="page-text">Параметры тренировки:</p>
                        <div className="params-container">
                            <div className="params-text">
                                <p>тип тренировки:</p>
                                <p>уровень сложности:</p>
                                <p>формат:</p>
                                <p>время:</p>
                            </div>
                            <div className="params-lists">
                                <ul className="buttons-list">
                                    {['кардио', 'йога', 'силовая', 'круговая'].map((tag) => (
                                        <li key={tag}>
                                            <a
                                                href="#!"
                                                onClick={() => handleTagClick('trainingType', tag)}
                                                className={`buttons-list__item ${selectedTags.trainingType === tag ? 'active-tag' : ''}`}
                                            >
                                                {tag}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <ul className="buttons-list">
                                    {['легкая', 'средняя', 'сложная'].map((tag) => (
                                        <li key={tag}>
                                            <a
                                                href="#!"
                                                onClick={() => handleTagClick('difficulty', tag)}
                                                className={`buttons-list__item ${selectedTags.difficulty === tag ? 'active-tag' : ''}`}
                                            >
                                                {tag}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <ul className="buttons-list">
                                    {['дом', 'улица', 'зал'].map((tag) => (
                                        <li key={tag}>
                                            <a
                                                href="#!"
                                                onClick={() => handleTagClick('format', tag)}
                                                className={`buttons-list__item ${selectedTags.format === tag ? 'active-tag' : ''}`}
                                            >
                                                {tag}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <ul className="buttons-list">
                                    {['10-15 мин', '30-60 мин', '1 час +'].map((tag) => (
                                        <li key={tag}>
                                            <a
                                                href="#!"
                                                onClick={() => handleTagClick('time', tag)}
                                                className={`buttons-list__item ${selectedTags.time === tag ? 'active-tag' : ''}`}
                                            >
                                                {tag}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="end-button">
                    <a href="#!" className="green-button" onClick={handleGenerateTraining}>
                        сгенерировать<br />тренировку
                    </a>
                </div>
            </div>
        </main>
    );
}
