﻿import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/TrainingDetail.css'
import Header from './Header';


export default function TrainingDetail() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false); // Состояние для закладки
  const [userData, setUserData] = useState({})

  useEffect(() => {
    console.log("Обновленные данные:", userData);
    handleGetStats()
  }, []);

  const handleGetStats = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
        if (!token) {
            console.error("Токен отсутствует. Пользователь не авторизован.");
            return;
        }

        console.log("Используемый токен:", token);

        const response = await fetch(`http://localhost:8081/users/lk`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            }
        });

        console.log("Статус ответа:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Ошибка: ${response.status} ${response.statusText}`);
            console.error(`Тело ошибки: ${errorText}`);
        }
        if (response.ok) {
            const data = await response.json();
            console.log("Полученные данные:", data);
            if (data.userStatistics == null){
              data.userStatistics = {
                skill: null,
                countOfTrains: null,
                weight: null,
                height: null,
                ibw: null
              }
            }
            setUserData(data)
        } 
        else {
            const errorText = await response.text();
            console.error("Ответ сервера:", response.status, response.statusText, errorText);
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        if (error instanceof TypeError) {
            console.error("Ошибка типа (скорее всего, ошибка сети или CORS).");
        }
    }
    
};


  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await fetch(`http://localhost:8081/trains/${id}`);
        const data = await response.json();
        setTraining(data);

        // Проверяем, совпадает ли текущий id с сохранённой закладкой
        const savedBookmark = localStorage.getItem(`bookmarkedTraining-${userData.login}`);
        setIsBookmarked(savedBookmark === id); // Устанавливаем состояние

      } catch (error) {
        console.error('Error loading training data:', error);
      }
    };

    fetchTraining();
  }, [id]);

  if (!training) {
    return <div>Loading...</div>;
  }

   const handleBookmarkClick = () => {
    if (isBookmarked) {
      // Удаляем закладку из localStorage
      localStorage.removeItem(`bookmarkedTraining-${userData.login}`);
    } else {
      // Сохраняем текущий id как закладку
      localStorage.setItem(`bookmarkedTraining-${userData.login}`, id);
    }

    setIsBookmarked((prev) => !prev); // Переключаем состояние
  };

  return (
    <>
    <div className="training-detail">
      <div className="training-detail-main">
        <div className="training-image-container">
          <img src="../src/img/negro_man.png" alt="" className="training-image" />
        </div>
        <div className="training-info-container">
          <h1>{training.title}</h1>
          <p className='training-description'>Описание: {training.description}</p>
          <p>Формат: {training.place}</p>
          <p>Время: {training.durationInMinutes} минут</p>
          <div className="training-tags">
            <p className='green-tag'>{training.category.category}</p>
            <p className='yellow-tag'>{training.status}</p>
          </div>
        </div>
      </div>
      <div className="training-detail-structure">
        <p>Состав тренировки:</p>
        <div className='training-block'>
          <ul className="training-exercises">
            <li className="training-exercise">приседания 10 раз</li>
            <li className="training-exercise">отжимания 10 раз</li>
            <li className="training-exercise">подтягивания 10 раз</li>
            <li className="training-exercise">жим лежа 5 раз</li>
          </ul>
        </div>
      </div>
      <div className="training-buttons-container">
        <button
            className="training-detail-button"
            onClick={handleBookmarkClick}
            style={{
              backgroundColor: isBookmarked ? "yellow" : "white", // Меняем цвет фона
              border: "1px solid #ccc",
            }}
        >
        <img src="../src/img/bookmark.svg" alt="" style={{width: '20px'}}/>
        </button>
        <button className='training-detail-button' onClick={() => navigate('/trains', { state: { mainType: 'trainings' } })}>
            Перейти на страницу тренировок
        </button>
        <button className='training-detail-button'>редактировать</button>
      </div>
    </div>
    </>
  );
}
