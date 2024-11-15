import './style.css'


export default function StartPage(){
    return(
        <>
            <section className="promo-desktop">
                <div className="block1">
                    <p className="first-level">БОЛЕЕ <span className="dark-green-text">100</span> ТРЕНИРОВОК</p>
                    <p className="second-level">ДЛЯ ДУШИ И ТЕЛА</p>
                </div>
                <div className="man">
                    <img src="./src/img/man.png" alt="Man" />
                </div>
                <div className="first-column-second-row">
                    <div className="training-button"><a href="#">быстрая тренировка</a></div>
                    <div className="training-button"><a href="#">показать тренировки</a></div>
                </div>            
            </section>
            <section className="top-trainings-desktop">
                <div className="top-trainings-wrapper">
                    <p className="top-trainings-text">попробуйте наши лучшие <span className="green-text">тренировки</span></p>
                </div>
                <div className="training-cards-container">
                    <ul className="training-cards">
                        <li className="training-card">
                                <figure>
                                    <img className="training-img"></img>
                                </figure>
                                <div className="training-type-box">
                                    <ul className="tag-list">
                                        <li className="cardio-red"><a href="#">кардио</a></li>
                                        <li className="long"><a href="#">долго</a></li>
                                    </ul>
                                </div>
                                <h3>тренировка №1</h3>
                                <p className="card-description">Описание тренировки</p>
                        </li>
                        <li className="training-card">
                            <figure>
                                <img className="training-img"></img>
                            </figure>
                            <div className="training-type-box">
                                <ul className="tag-list">
                                    <li className="cardio-red"><a href="#">силовая</a></li>
                                    <li className="fast"><a href="#">быстро</a></li>
                                </ul>
                            </div>
                            <h3>тренировка №2</h3>
                            <p className="card-description">Описание тренировки</p>
                        </li>
                        <li className="training-card">
                            <figure>
                                <img className="training-img"></img>
                            </figure>
                            <div className="training-type-box">
                                <ul className="tag-list">
                                    <li className="cardio-red"><a href="#">йога</a></li>
                                </ul>
                            </div>
                            <h3>тренировка №3</h3>
                            <p className="card-description">Описание тренировки</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="top-trainings-desktop">
                <div className="top-trainings-wrapper">
                    <p className="info-text">Информация</p>
                </div>
                <div className="information-container">
                    <img src="./src/img/info1.svg" alt="" className="instruction-1" />
                    <img src="./src/img/info2.svg" alt="" className="instruction-2" />
                </div>
            </section>
        </>
    )
}