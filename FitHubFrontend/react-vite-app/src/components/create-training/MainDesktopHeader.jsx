import { useState } from 'react';

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
        if (!selectedFile || !workoutName || !workoutDescription) {
            alert('Пожалуйста, заполните все поля и выберите файл!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', workoutName);
        formData.append('description', workoutDescription);

        try {
            const response = await fetch('http://ваш_сервер_здесь/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Данные и файл успешно загружены');
            } else {
                console.error('Ошибка загрузки данных');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="main-desktop">
            <div className="gallery-desktop">
                <div className="main-desktop__gallery">
                    <a href="#!">
                        <img src="/FitHubFrontend/react-vite-app/src/img/man.png" alt="" className="gallery__main-photo" />
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
                    <div className="options__tags">
                        <a className="tag_red">тег 1</a>
                        <a className="tag_purple">тег 2</a>
                        <a className="tag_blue">тег 3</a>
                    </div>
                    <div className="options__upload">
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Загрузить данные и картинку</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
