import React from "react";
import { Link } from 'react-router-dom';

function Training({ training }) {
    const categories = (training.category && training.category.category)
    ? training.category.category.split(' ')
    : []; // Если нет значения, вернем пустой массив

    // Обрезка описания до 40 символов
    const truncatedDescription = training.description.length > 40
        ? training.description.slice(0, 40) + "..."
        : training.description;

    // Формируем URL для изображения тренировки
    const trainingImageUrl = `http://localhost:8081/trains/${training.id}/image`;

    return (
        <Link to={`/trains/${training.id}`}>
            <li className="training-card">
                <figure>
                    {/* Используем динамический URL изображения */}
                    <img
                        className="training-img"
                        src={trainingImageUrl}
                        alt={training.title}
                        onError={(e) => {
                            // Устанавливаем placeholder, если изображение недоступно
                            e.target.src = './src/img/placeholder.png';
                        }}
                    />
                </figure>
                <div className="training-type-box">
                    <ul className="tag-list">
                        {categories.map((category, index) => (
                            <li key={index} className='tag_red'>
                                <a href="#">{category}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <h3>{training.title}</h3>
                <p className="card-description">{truncatedDescription}</p>
            </li>
        </Link>
    );
}

export default Training;
