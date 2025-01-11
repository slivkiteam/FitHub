import { useState } from 'react';
import { saveContact } from '../../api/TrainService';

export default function MainDesktopHeader({ selectedTags }) {
    const [selectedFile, setSelectedFile] = useState(null); // Выбранный файл
    const [previewImage, setPreviewImage] = useState(null); // Предпросмотр изображения
    const [workoutName, setWorkoutName] = useState(''); // Название тренировки
    const [workoutDescription, setWorkoutDescription] = useState(''); // Описание тренировки
    const token = localStorage.getItem('jwtToken');

    // Функция обработки выбора файла
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Предпросмотр изображения
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleGetAuthor = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            if (!token) {
                console.error("Токен отсутствует. Пользователь не авторизован.");
                return null;
            }
    
            console.log("Используемый токен:", token);
    
            const response = await fetch(`http://localhost:8081/users/lk`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
    
            if (!response.ok) {
                console.error('Ошибка при получении автора:', response.status);
                return null;
            }
    
            const data = await response.json(); // Ожидание обработки JSON
            const author = `${data.name} ${data.surname}`;
            return author; // Возвращаем автора
        } catch (e) {
            console.error('Ошибка при получении автора:', e);
            return null;
        }
    };

    // Функция для загрузки изображения
    const uploadImage = async (trainingId) => {
        if (!selectedFile) {
            console.warn('Файл не выбран.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch(`http://localhost:8081/trains/${trainingId}/image`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`,
                  }
            });

            if (response.ok) {
                console.log('Изображение успешно загружено.');
            } else {
                console.error('Ошибка при загрузке изображения:', response.status);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    // Функция для создания тренировки
    const handleUpload = async () => {
        let durationInMinutes = 0;
        let difficulty = '';
    
        if (!workoutName || !workoutDescription || !selectedFile) {
            alert('Пожалуйста, заполните все поля и выберите файл!');
            return;
        }
    
        if (selectedTags.time === '1 ЧАС +') durationInMinutes = 70;
        if (selectedTags.time === '30-60 МИН') durationInMinutes = 45;
        if (selectedTags.time === '10-15 МИН') durationInMinutes = 15;
    
        if (selectedTags.difficulty.toUpperCase() === 'СЛОЖНАЯ') difficulty = 'СЛОЖНО';
        if (selectedTags.difficulty.toUpperCase() === 'СРЕДНЯЯ') difficulty = 'СРЕДНЕ';
        if (selectedTags.difficulty.toUpperCase() === 'ЛЕГКАЯ') difficulty = 'ЛЕГКО';
    
        try {
            const author = await handleGetAuthor(); // Ожидание результата функции
    
            const training = {
                title: workoutName.replace(/[A-Z]/g, (char) => char.toLowerCase()),
                description: workoutDescription,
                status: difficulty,
                score: 0.0,
                used: 0,
                durationInMinutes: durationInMinutes,
                countOfIteration: 15,
                author: author, // Используем полученного автора
                place: selectedTags.format,
                image: null, // Пока null, т.к. изображение отправим отдельно
                category: {
                    category: selectedTags.trainingType,
                },
                exercises: JSON.parse(localStorage.getItem('exercises')),
            };
            localStorage.removeItem('exercises');
    
            const response = await saveContact(training);
            console.log('Данные ответа о создании тренировки', response);
            if (response.data) {
                alert('Тренировка успешно создана.');
    
                // Отправляем изображение после создания тренировки
                await uploadImage(response.data);
            }
        } catch (error) {
            console.error('Ошибка при создании тренировки:', error);
        }
    }

    return (
        <div className="main-desktop">
            <div className="gallery-desktop">
                <div className="main-desktop__gallery">
                    <a href="#!">
                        {previewImage ? (
                            <img src={previewImage} alt="Предпросмотр" className="gallery__main-photo" />
                        ) : (
                            <img src="./negro_man.png" alt="Placeholder" className="gallery__main-photo" />
                        )}
                    </a>
                </div>
                <div className="options">
                    <div className="options__inputs">
                        <input
                            type="text"
                            placeholder="Введите название тренировки"
                            className="options__name-input"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Введите описание тренировки"
                            className="options__description-input"
                            value={workoutDescription}
                            onChange={(e) => setWorkoutDescription(e.target.value)}
                        />
                    </div>
                    <div className="options__upload">
                        <div className="file-upload">
                            <label htmlFor="file-input" className="custom-file-upload">
                                Выбрать фотографию
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden-file-input"
                            />
                        </div>
                        <button className="data-button" onClick={handleUpload}>
                            Загрузить данные
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
