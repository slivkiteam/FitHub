import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    <div className="training-detail">
      <h1>{training.title}</h1>
      <p>Тип тренировки: {training.category.category}</p>
      <p>Уровень сложности: {training.status}</p>
      <p>Формат: {training.place}</p>
      <p>Время: {training.durationInMinutes}</p>
      <p>Описание: {training.description}</p>
      {/* Навигация с изменением mainType */}
      <button onClick={() => navigate('/trains', { state: { mainType: 'trainings' } })}>
        Вернуться на страницу тренировок
      </button>
    </div>
  );
}
