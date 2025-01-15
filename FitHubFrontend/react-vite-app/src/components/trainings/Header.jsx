import React, { useState, useEffect } from 'react';
import './css/Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header({ mainType, onTypeChange }) {

    const activeColor = 'rgb(120, 229, 143)';
    const defaultColor = 'rgb(41, 41, 41)';

    // Используем localStorage для сохранения состояния авторизации
    const [accountType, setAccountType] = useState(localStorage.getItem('accountType') || 'no_auth');
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                setAccountType('auth');
            } else {
                setAccountType('no_auth');
            }
        };

        // Устанавливаем обработчик события
        window.addEventListener('storage', handleStorageChange);

        // Выполняем проверку при инициализации компонента
        handleStorageChange();

        // Очистка обработчика события при размонтировании компонента
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    
    const handleLogin = () => {
        if (localStorage.getItem('jwtToken')) {
            console.log(localStorage.getItem('jwtToken'))
            setAccountType('auth');
            localStorage.setItem('accountType', 'auth'); // Сохраняем состояние авторизации
        }
        navigate('/login');
    };


    const handleRegisrtation = () => {
        localStorage.setItem('accountType', 'auth');
        navigate('/registration');
    };

    // Логика для выхода из аккаунта
    const handleLogout = () => {
        setAccountType('no_auth');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('accountType');
        navigate('/');
    };

    const handleToUserPage = () => {
        navigate('/user-page');
    };

    return (
        <header className="header">
            <div className="header__desktop">
                <a href="#!" onClick={() => onTypeChange('startPage')}>
                    <img src="..\..\src\img\logo.svg" alt="Logo" className="header__logo" />
                </a>
                <nav className="header__nav">
                    <ul className="header__list">
                        <li>
                            <a
                                href="#!"
                                style={{ color: mainType === 'trainings' ? activeColor : defaultColor }}
                                onClick={() => onTypeChange('trainings')} 
                            >
                                тренировки
                            </a>
                        </li>
                        <li>
                            <a
                                href="#!"
                                style={{ color: mainType === 'create' ? activeColor : defaultColor }}
                                onClick={() => onTypeChange('create')} 
                            >
                                создать тренировку
                            </a>
                        </li>
                    </ul>
                    {accountType === 'no_auth' ? (
                        <ul className="header__list__registration">
                            <li>
                                <a href="#!" onClick={handleLogin}>
                                    вход
                                </a>
                            </li>
                            <li>
                                <a href="#!" onClick={handleRegisrtation} className="header__registration">
                                    регистрация
                                </a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="header__list__registration">
                            <li>
                                <a href="#!" onClick={() => onTypeChange('user-page')}>
                                    <img src="..\..\src\img\user_icon.svg" className="user_icon" alt="User Icon" />
                                </a>
                            </li>
                            <li><a on onClick={handleLogout}>Выйти</a></li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
}
