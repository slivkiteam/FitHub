export default function Trainings_Header(){
    return(
        <header className="profile-header">
            <div className="profile-header-desktop">
            <img src='src\img\logo.svg'></img>
                <nav>
                    <ul className="nav_list">
                        <li className="nav-item-1"><a className ='green-text' href="#">тренировки</a></li>
                        <li className="nav-item-2"><a href="#">создать тренировку</a></li>
                        <li className="nav-item-3"><a href="#">вход</a></li>
                        <li className="nav-item-4"><a href="#">регистрация</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}