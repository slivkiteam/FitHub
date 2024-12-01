import './css/Main.css';
import MainDesktopHeader from './MainDesktopHeader';
import { useState } from 'react';

export default function MainCreateTraining({ selectedTags, setSelectedTags }) {
    const handleTagClick = (category, tag) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [category]: prevSelectedTags[category] === tag ? null : tag
        }));
    };

    const handleGenerateTraining = () => {
        if (Object.values(selectedTags).includes(null)) {
            alert('Пожалуйста, заполните все поля!');
            return;
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
