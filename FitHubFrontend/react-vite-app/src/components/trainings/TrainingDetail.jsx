import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/TrainingDetail.css'
import Header from './Header';


export default function TrainingDetail() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await fetch(`http://localhost:8081/trains/${id}`);
        const data = await response.json();
        setTraining(data);
      } catch (error) {
        console.error('Error loading training data:', error);
      }
    };

    fetchTraining();
  }, [id]);

  if (!training) {
    return <div>Loading...</div>;
  }

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
        <button className='training-detail-button' onClick={() => navigate('/trains', { state: { mainType: 'trainings' } })}>
            Перейти на страницу тренировок
        </button>
        <button className='training-detail-button'>редактировать</button>
      </div>
    </div>
    </>
  );
}
