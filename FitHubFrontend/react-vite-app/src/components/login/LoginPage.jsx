import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Для перенаправления

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Правильные почта и пароль
    const correctEmail = 'test@test.com';
    const correctPassword = '12345';

    const handleLogin = () => {
        // Проверка на пустые поля
        if (email.trim() === '' || password.trim() === '') {
            setError('Пожалуйста, заполните все поля.');
        } else if (email !== correctEmail || password !== correctPassword) {
            // Проверка на правильность введенных данных
            setError('Неверная почта или пароль.');
        } else {
            setError(''); // Очищаем ошибку
            navigate('/trains'); // Перенаправляем на страницу тренировок
        }
    };

    return (
        <div className="sign-in-container">
            <div className="left-column">
                <img src="../src/img/logo.svg" alt="Logo" />
                <div className="left-column-container">
                    <h1>вход</h1>
                    <input
                        type="email"
                        className="mail-input"
                        placeholder="почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Обновляем email
                    />
                    <input
                        type="password"
                        className="password-input"
                        placeholder="пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Обновляем пароль
                    />
                    {error && <p className="error-message">{error}</p>} {/* Вывод ошибки */}
                    <a href="#!" className="sign-in-button" onClick={handleLogin}>
                        войти
                    </a>
                </div>
            </div>
            <div className="right-column">
                <h1 className="white-h1">Твой старт к лучшей версии себя!</h1>
                <img src="../src/img/negro_man.png" width="400px" height="400px" alt="Motivational" />
            </div>
        </div>
    );
}
