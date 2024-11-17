import Header from "../trainings/Header";

export default function UserPage(){
    return (
        <>
        <main>
            <section class="personal-account">
                <div class="first-row">
                    <img class="personal-avatar" src="./src/img/placeholder.png" />
                    <div class="personal-account-parameters">
                        <input class="second-name" placeholder="фамилия" />
                        <input class="name" placeholder="имя" />
                        <input class="third-name" placeholder="логин" defaultValue="test" />
                        <input class="height" placeholder="рост" />
                        <input class="weight" placeholder="вес" /> 
                        <input class="age" placeholder="возраст" />
                        <input type="gender" className="gender" placeholder="пол" />
                    </div>
                </div>
            </section>
            <section class="featured-workout">
                <div class="wrapper">
                    <p class="wrapper-text">избранная тренировка</p>
                </div>
                <div class="featured-workout-container">
                    <img class="background" src="./src/img/image.png.png" />
                    <div class="training-card">
                        <figure>
                            <img class="training-img"></img>
                        </figure>
                        <div class="training-type-box">
                            <ul class="tag-list">
                                <li class="cardio-red"><a href="#">йога</a></li>
                            </ul>
                        </div>
                        <h3>тренировка №1</h3>
                        <p class="card-description">Описание тренировки</p>
                    </div>
                    <ul class="featured-workout-tags">
                        <li class="featured-workout-tag tag-count">повторений</li>
                        <li class="featured-workout-tag tag-time">общей длительности</li>
                        <li class="featured-workout-tag tag-kkal">ккал сожжено</li>
                    </ul>
                </div>
            </section>      
            <section class="history-trainings-desktop">
                <div class="wrapper">
                    <p class="wrapper-text">история тренировок</p>
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
        </main>
    </>
    )
}