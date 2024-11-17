import { useState } from 'react';
import { json } from 'react-router-dom';
import { saveContact } from '../../api/TrainService';


export default function MainDesktopHeader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [workoutName, setWorkoutName] = useState(''); // Состояние для названия тренировки
    const [workoutDescription, setWorkoutDescription] = useState(''); // Состояние для описания тренировки

    // Функция обработки выбора файла
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Функция для загрузки на сервер
    const handleUpload = async () => {
        if (!workoutName || !workoutDescription) {
            alert('Пожалуйста, заполните все поля и выберите файл!');
            return;
        }
        const training = {
            "title": workoutName,
            "description": workoutDescription,
            "status": "СЛОЖНО",
            "score": 0.0,
            "used": 10,
            "durationInMinutes": 1234,
            "countOfIteration": 15,
            "author": "ADMIN",
            "place": "ДОМ",
            "category": {
                "category": "СИЛОВАЯ"
            }
        }


        try {
            saveContact(training);
            alert('Тренировка успешно создана')
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="main-desktop">
            <div className="gallery-desktop">
                <div className="main-desktop__gallery">
                    <a href="#!">
                        <img src="..\src\img\negro_man.png" alt="" className="gallery__main-photo" />
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
                        <button className="data-button" onClick={handleUpload}>Загрузить данные</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
