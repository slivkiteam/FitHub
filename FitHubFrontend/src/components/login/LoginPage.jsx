import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Очистка предыдущих ошибок
        setIsLoading(true); // Устанавливаем состояние загрузки

        if (email.trim() === '' || password.trim() === '') {
            setError('Пожалуйста, заполните все поля.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://212.41.6.237/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "login": email, "password": password }),
            });

            if (response.ok) {
                console.log(response)
                console.log(JSON.stringify({ "login": email, "password": password }))
                const result = await response.json();
                if (result.message){
                    alert(result.message)
                }
                else {
                    console.log(result)
                const jwtToken = result["jwt-token"];

                // Логирование токена (для отладки, не используйте в продакшн)
                console.log('JWT токен получен:', jwtToken);

                // Сохраняем токен в localStorage
                localStorage.setItem('jwtToken', jwtToken);

                // Перенаправляем на страницу тренировок
                navigate('/trains');
                }
                
            } else {
                setError('Неверная почта или пароль.');
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            setError('Ошибка при отправке данных');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-in-container">
            <div className="left-column">
                <img src="./logo.svg" alt="Logo" />
                <div className="left-column-container">
                    <h1>Вход</h1>
                    <form className='login-form' onSubmit={handleLogin}>
                        <input
                            type="email"
                            className="mail-input"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="password-input"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="sign-in-button" disabled={isLoading}>
                            {isLoading ? 'Загружается...' : 'Войти'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="right-column">
                <h1 className="white-h1">Твой старт к лучшей версии себя!</h1>
                <img src="./negro_man.png" width="400px" height="400px" alt="Motivational" />
            </div>
        </div>
    );
}
