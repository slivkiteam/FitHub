import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';


export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Обработчик отправки формы
    const handleRegistration = async (e) => {
        e.preventDefault();
        setError(''); // Очистка предыдущих ошибок
        setIsLoading(true); // Устанавливаем состояние загрузки

        if (email.trim() === '' || password.trim() === '') {
            setError('Пожалуйста, заполните все поля.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "login": email, "password": password }),
            });
            console.log(JSON.stringify({ "login": email, "password": password }))
            if (response.ok) {
                // Если запрос успешен
                const result = await response.json();
                if (result.message){
                    alert('Аккаунт с такой почтой уже существует')
                }
                else{
                    console.log('Ответ с сервера:', result);
                    // Можете перенаправить или показать сообщение об успешной регистрации
                    const jwtToken = result["jwt-token"];
                    // Сохраняем токен в localStorage
                    localStorage.setItem('jwtToken', jwtToken);

                    // Перенаправляем на страницу тренировок
                    navigate('/trains');
                }
                
            } else {
                // Если сервер вернул ошибку
                setError('Произошла ошибка при регистрации. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setError('Ошибка при отправке данных');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-in-container">
            <div className="left-column">
            <a href="http://localhost:5173/trains"> <img src="../src/img/logo.svg" alt="Logo" /></a>
                <div className="left-column-container">
                    <h1>регистрация</h1>
                    <input
                        type="email"
                        className="mail-input"
                        placeholder="почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="password-input"
                        placeholder="пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="sign-in-button"
                        onClick={handleRegistration}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Загрузка...' : 'зарегистрироваться'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
            <div className="right-column">
                <h1 className="white-h1">Твой старт к лучшей версии себя!</h1>
                <img src="../negro_man.png" width="400px" height="400px" />
            </div>
        </div>
    );
}
