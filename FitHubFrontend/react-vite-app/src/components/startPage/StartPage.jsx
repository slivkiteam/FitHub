import './style.css'


export default function StartPage(){
    return(
        <>
            <section class="promo-desktop">
                <div class="block1">
                    <p class="first-level">БОЛЕЕ <span class="dark-green-text">100</span> ТРЕНИРОВОК</p>
                    <p class="second-level">ДЛЯ ДУШИ И ТЕЛА</p>
                </div>
                <div class="man">
                    <img src="./src/img/man.png" alt="Man" />
                </div>
                <div class="first-column-second-row">
                    <div class="training-button"><a href="#">быстрая тренировка</a></div>
                    <div class="training-button"><a href="#">показать тренировки</a></div>
                </div>            
            </section>
            <section class="top-trainings-desktop">
                <div class="top-trainings-wrapper">
                    <p class="top-trainings-text">попробуйте наши лучшие <span class="green-text">тренировки</span></p>
                </div>
                <div class="training-cards-container">
                    <ul class="training-cards">
                        <li class="training-card">
                                <figure>
                                    <img class="training-img"></img>
                                </figure>
                                <div class="training-type-box">
                                    <ul class="tag-list">
                                        <li class="cardio-red"><a href="#">кардио</a></li>
                                        <li class="long"><a href="#">долго</a></li>
                                    </ul>
                                </div>
                                <h3>тренировка №1</h3>
                                <p class="card-description">Описание тренировки</p>
                        </li>
                        <li class="training-card">
                            <figure>
                                <img class="training-img"></img>
                            </figure>
                            <div class="training-type-box">
                                <ul class="tag-list">
                                    <li class="cardio-red"><a href="#">силовая</a></li>
                                    <li class="fast"><a href="#">быстро</a></li>
                                </ul>
                            </div>
                            <h3>тренировка №2</h3>
                            <p class="card-description">Описание тренировки</p>
                        </li>
                        <li class="training-card">
                            <figure>
                                <img class="training-img"></img>
                            </figure>
                            <div class="training-type-box">
                                <ul class="tag-list">
                                    <li class="cardio-red"><a href="#">йога</a></li>
                                </ul>
                            </div>
                            <h3>тренировка №3</h3>
                            <p class="card-description">Описание тренировки</p>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}