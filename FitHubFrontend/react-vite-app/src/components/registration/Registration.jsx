import './Registration.css'

export default function Registration(){
    return (
        <div class="sign-in-container">
            <div class="left-column">
                
                <div class="left-column-container">
                    <h1>регистрация</h1>
                    <input type="email" class="mail-input" placeholder="почта"></input>
                    <input type="password" class="password-input" placeholder="пароль"></input>
                    <a href="#" class="sign-in-button">зарегестрироваться</a>
                </div>
            </div>
            <div class="right-column">
                <h1 class="white-h1">Твой старт к лучшей версии себя!</h1>
                <img src="../src/img/negro_man.png" width="400px" height="400px" />
            </div>
        </div>
    )
}