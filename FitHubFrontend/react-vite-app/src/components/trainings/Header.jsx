import React from 'react';
import './css/Header.css';
import { useState } from 'react';

export default function Header({ mainType, onTypeChange }) {

    const activeColor = 'rgb(120, 229, 143)';
    const defaultColor = 'rgb(41, 41, 41)';

    const [accountType, setAccountType] = useState('no_auth');

    return (
        <header className="header">
            <div className="header__desktop">
                <img src="..\..\src\img\logo.svg" alt="" className="header__logo" />
                <nav className="header__nav">
                    <ul className="header__list">
                        <li>
                            <a
                                href="#!"
                                style={{ color: mainType === 'trainings' ? activeColor : defaultColor }}
                                onClick={() => onTypeChange('trainings')} // Изменяем тип на 'trainings'
                            >
                                тренировки
                            </a>
                        </li>
                        <li>
                            <a
                                href="#!"
                                style={{ color: mainType === 'create' ? activeColor : defaultColor }}
                                onClick={() => onTypeChange('create')} // Изменяем тип на 'create'
                            >
                                создать тренировку
                            </a>
                        </li>
                    </ul>
                    {accountType === 'no_auth' ? (
                        <ul className="header__list__registration">
                        <li>
                            <a 
                                href="#!"
                                onClick={() => setAccountType('auth')}
                            >
                            вход
                            </a>
                        </li>
                        <li><a href="#!" className="header__registration">регистрация</a></li>
                    </ul>
                    ) : 
                    (<ul className="header__list__registration">
                        <li>
                            <a 
                                href="#!"
                            >
                            <img src='..\..\src\img\user_icon.svg' className='user_icon'></img>
                            </a>
                        </li>
                    </ul>)}
                </nav>
            </div>
        </header>
    );
}
