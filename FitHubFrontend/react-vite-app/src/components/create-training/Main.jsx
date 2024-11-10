import './css/Main.css'
import MainDesktopHeader from './MainDesktopHeader'

export default function MainCreateTraining(){
    return(
        <>
            <main className="main">
            <MainDesktopHeader />
            <div className="settings-desktop">
                <div className="training-settings-container">
                    <div className="settings-desktop__structure">
                        <p className="page-text">
                            Состав тренировки:
                        </p>
                        <div className="structure-buttons">
                            <a href="#!" className="green-button">добавить подход</a>
                            <a href="#!" className="green-button">добавить упраженение</a>
                        </div>
                    </div>
                    <div className="settings-desktop_params">
                        <p className="page-text">
                            Параметры тренировки:
                        </p>
                        <div className="params-container">
                            <div className="params-text">
                                <p>тип тренировки:</p>
                                <p>уровень сложности:</p>
                                <p>формат:</p>
                                <p>время:</p>
                            </div>
                            <div className="params-lists">

                                <ul className="buttons-list">
                                    <li><a href="#!" className="buttons-list__item tag_green">кардио</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_yellow">йога</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_red">силовая</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_purple">круговая</a></li>
                                </ul>

                                <ul className="buttons-list">
                                    <li><a href="#!" className="buttons-list__item tag_green">легкая</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_yellow">средняя</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_red">сложная</a></li>
                                </ul>

                                <ul className="buttons-list">
                                    <li><a href="#!" className="buttons-list__item tag_green">дом</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_yellow">улица</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_red">зал</a></li>
                                </ul>

                                <ul className="buttons-list">
                                    <li><a href="#!" className="buttons-list__item tag_green">10-15 мин</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_yellow">30-60 мин</a></li>
                                    <li><a href="#!" className="buttons-list__item tag_red">1 час +</a></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="end-button">
                    <a href="#!" className="green-button">сгеренировать<br></br>тренировку</a>
                </div>
            </div>
        </main>
        </>
    )
}