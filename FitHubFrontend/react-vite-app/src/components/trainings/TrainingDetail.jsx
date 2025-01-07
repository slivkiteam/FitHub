import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/TrainingDetail.css'
import Header from './Header';
import Exercise from '../exercise/Exercise';

export default function TrainingDetail() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userData, setUserData] = useState({});
  const [exercises, setExercises] = useState([]);
  const [trainingImage, setTrainingImage] = useState(null); // Состояние для URL картинки
  const [isMarked, setIsMarked] = useState(false);

  
  useEffect(() => {
    console.log("Обновленные данные:", userData);
    handleGetStats();
  }, [training]);

  const handleUpdateUsed = async () => {
    if (!training) {
      console.error('Ошибка: Данные тренировки еще не загружены');
      return;
    }
  
    const updatedUsedTrain = {
      ...training,
      used: training.used + 1,
    };
  
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('Ошибка: Токен отсутствует');
        return;
      }
  
      const response = await fetch(`http://localhost:8081/trains/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUsedTrain),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      // Локальное обновление состояния
      setTraining((prevTraining) => ({
        ...prevTraining,
        used: prevTraining.used + 1,
      }));
  
      // Блокируем кнопку
      setIsMarked(true);
  
      console.log('Тренировка успешно обновлена');
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };


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
            console.log(data.exercises)
            setUserData(data);
        } 
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
  };

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        // Получаем данные тренировки
        const response = await fetch(`http://localhost:8081/trains/${id}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Полученные данные тренировки:", data);
  
        // Устанавливаем данные тренировки в состояние
        setTraining(data);
  
        // Устанавливаем упражнения из ответа в состояние exercises
        if (data.exercises) {
          setExercises(data.exercises);
        }
  
        // Проверяем закладку для текущего пользователя
        const savedBookmark = localStorage.getItem(`bookmarkedTraining-${userData.login}`);
        setIsBookmarked(savedBookmark === id);
  

        // Делаем GET-запрос для изображения
        const imageResponse = await fetch(`http://localhost:8081/trains/${id}/image`, {
          method: 'GET'
        });
        if (imageResponse.ok) {
          const blob = await imageResponse.blob(); // Получаем данные в виде Blob
          const imageUrl = URL.createObjectURL(blob); // Генерируем URL
          setTrainingImage(imageUrl); // Устанавливаем URL изображения в состояние
        } else {
          console.error("Ошибка загрузки изображения:", imageResponse.status);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных тренировки:", error);
      }
    };
  
    fetchTraining();
  }, [id, userData.login]);
  

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
          {/* Используем загруженное изображение */}
          {trainingImage ? (
            <img src={trainingImage} alt="Тренировка" className="training-image" />
          ) : (
            <img src="../../img/negro_man.png" alt="Тренировка" className="training-image" />
          )}
        </div>
        <div className="training-info-container">
          <h1>{training.title}</h1>
          <p className='training-description'>Описание: {training.description}</p>
          <p>Формат: {training.place}</p>
          <p>Время: {training.durationInMinutes} минут</p>
          <p>Выполнений: {training.used}</p>
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
            {Object.keys(exercises).length > 0 ? (
                  Object.values(exercises).map((exercise, index) => (
                      <Exercise key={index} exer={exercise} />
                  ))
              ) : (
                  <p className="page-text">Упражнения не сгенерированы</p>
              )}
          </ul>
        </div>
      </div>
      <div className="training-buttons-container">
        <button
            className="training-detail-button"
            onClick={handleBookmarkClick}
            style={{
              backgroundColor: isBookmarked ? "yellow" : "white",
              border: "1px solid #ccc",
            }}
        >
        <img src="../src/img/bookmark.svg" alt="" style={{width: '20px'}}/>
        </button>
        <button className='training-detail-button' onClick={() => navigate('/trains', { state: { mainType: 'trainings' } })}>
            Перейти на страницу тренировок
        </button>
        {isMarked ? (
          <div className="training-detail-button">
            <p style={{display: 'flex', alignItems: 'center', color: 'white'}}>Отмечено</p>
            <img style={{width: '20px'}} src="../src/img/check.svg" />
          </div>
          ) : (
            <button
              className="training-detail-button"
              onClick={handleUpdateUsed}
            >
              отметить как выполненное
            </button>
          )}
      </div>
    </div>
    </>
  );
}
