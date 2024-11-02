import './css/Header.css'

export default function Header(){
    return (
    <header className="header">
            <div className="header__desktop">
            <img src="..\..\src\img\logo.svg" alt="" className="header__logo"></img>
                <nav className="header__nav">
                    <ul className="header__list">
                        <li><a href="#!" className="active">тренировки</a></li>
                        <li><a href="#!">создать тренировку</a></li>
                    </ul>
                    <ul className="header__list__registration">
                        <li><a href="#!">вход</a></li>
                        <li><a href="#!" className="header__registration">регистрация</a></li>
                    </ul>
                </nav>
        </div>
    </header>
    )
}