﻿import React, { useState } from 'react';
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
            const response = await fetch('http://212.41.6.237/api/auth/registration', {
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
                    alert(result.message)
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
                <svg className='logo' width="115" height="100" viewBox="0 0 115 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <desc></desc>
                    <defs/>
                    <path id="Fit hub" d="M29.37 0L3.11 0L3.11 33.59L9.5 33.59L9.5 19.53L28.32 19.53L28.32 14.06L9.5 14.06L9.5 5.75L29.37 5.75L29.37 0ZM40.31 0L33.93 0L33.93 33.59L40.31 33.59L40.31 0ZM44.49 5.75L56.64 5.75L56.64 33.59L63.07 33.59L63.07 5.75L75.21 5.75L75.21 0L44.49 0L44.49 5.75Z" fill="#292929" fill-opacity="1.000000" fill-rule="evenodd"/>
                    <path id="Fit hub" d="M9.5 42L3.11 42L3.11 75.59L9.5 75.59L9.5 61.67L26.78 61.67L26.78 75.59L33.21 75.59L33.21 42L26.78 42L26.78 55.92L9.5 55.92L9.5 42ZM44.92 42L38.49 42L38.49 61.33Q38.49 64.01 39.33 66.41Q39.48 66.84 39.66 67.27Q40.43 69.05 41.57 70.55Q42.2 71.36 42.93 72.09Q43.39 72.54 43.88 72.95Q45.63 74.42 47.82 75.36Q48.3 75.56 48.8 75.73Q51.19 76.55 53.85 76.55Q56.76 76.55 59.31 75.6Q59.62 75.49 59.92 75.36Q62.26 74.35 64.08 72.76Q64.45 72.44 64.8 72.09Q65.47 71.42 66.04 70.68Q67.24 69.14 68.03 67.27Q68.23 66.8 68.4 66.32Q69.22 63.97 69.22 61.33L69.22 42L62.83 42L62.83 61.33Q62.83 62.53 62.55 63.66Q62.4 64.25 62.17 64.82Q61.81 65.75 61.27 66.56Q60.85 67.19 60.32 67.75Q60.05 68.04 59.76 68.29Q58.76 69.19 57.47 69.77Q57.42 69.79 57.36 69.82Q55.75 70.51 53.85 70.51Q52 70.51 50.42 69.85Q50.32 69.81 50.22 69.77Q48.87 69.15 47.83 68.19Q47.61 67.98 47.4 67.75Q47.04 67.36 46.72 66.93Q46.02 65.97 45.57 64.82Q45.36 64.29 45.22 63.73Q44.92 62.57 44.92 61.33L44.92 42ZM94.32 42L74.54 42L74.54 75.59L94.32 75.59Q95.89 75.59 97.31 75.12Q97.66 75 98.01 74.85Q99.53 74.2 100.69 73.14Q100.85 72.99 101.01 72.84Q101.32 72.53 101.6 72.19Q102.47 71.14 103.02 69.84Q103.21 69.4 103.36 68.95Q103.77 67.61 103.77 66.14Q103.77 64.04 102.94 62.35Q102.8 62.07 102.64 61.8Q102.02 60.76 101.18 59.95Q100.48 59.29 99.64 58.79Q100.5 58.28 101.2 57.61Q102.03 56.82 102.64 55.8Q102.81 55.51 102.96 55.2Q103.77 53.52 103.77 51.45Q103.77 49.92 103.32 48.54Q103.19 48.14 103.02 47.76Q102.42 46.35 101.47 45.25Q101.25 45 101.01 44.76Q100.77 44.52 100.52 44.3Q99.42 43.35 98.01 42.75Q97.63 42.58 97.23 42.45Q95.85 42 94.32 42ZM80.92 56.06L80.92 47.75L93.36 47.75Q94.42 47.75 95.29 48.15Q95.92 48.45 96.45 48.96Q97.11 49.57 97.43 50.33Q97.73 51.04 97.73 51.89Q97.73 52.38 97.62 52.84Q97.53 53.19 97.39 53.51Q97.23 53.88 97.01 54.2Q96.76 54.55 96.45 54.86Q96.29 55.02 96.11 55.16Q95.64 55.52 95.06 55.75Q94.27 56.06 93.36 56.06L80.92 56.06ZM95.32 69.41Q94.43 69.83 93.36 69.83L80.92 69.83L80.92 61.53L93.36 61.53Q94.27 61.53 95.06 61.85Q95.6 62.05 96.05 62.39Q96.26 62.54 96.45 62.73Q96.67 62.94 96.86 63.18Q97.18 63.59 97.39 64.07Q97.48 64.28 97.55 64.5Q97.73 65.08 97.73 65.7Q97.73 66.55 97.43 67.26Q97.11 68.02 96.45 68.63Q95.93 69.12 95.32 69.41Z" fill="#9CFCA6" fill-opacity="1.000000" fill-rule="evenodd"/>
                    <path id="Стрелка 1" d="M110.37 36.09L104.45 30.17C103.86 29.57 103.86 28.64 104.45 28.05C105.04 27.45 105.98 27.45 106.57 28.05L115.06 36.53C115.65 37.13 115.65 38.06 115.06 38.65L106.57 47.14C105.98 47.73 105.04 47.73 104.45 47.14C103.86 46.54 103.86 45.61 104.45 45.02L110.37 39.09L4 39.09C3.16 39.09 2.5 38.43 2.5 37.59C2.5 36.75 3.16 36.09 4 36.09L110.37 36.09Z" fill="#292929" fill-opacity="1.000000" fill-rule="evenodd"/>
                </svg>
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
                <img src="./negro_man.png" width="400px" height="400px" />
            </div>
        </div>
    );
}
