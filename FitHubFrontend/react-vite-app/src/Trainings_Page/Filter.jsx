import OpenFilterButton from "./OpenFilter";

export default function Filter(){
    return (
        <div className="filter-container">
            <li className="filter" >
                <div className="filter-text">
                    <h2>фильтры</h2>
                </div>
                <div className="filter-settings">
                    <p>тип тренировки
                        <OpenFilterButton />
                    </p>
                    <p>уровень сложности:
                        <OpenFilterButton />
                    </p>
                    <p>формат: 
                        <OpenFilterButton />
                    </p>
                    <p>время:
                        <OpenFilterButton />
                    </p>
                </div>
            </li>
        </div>
    )
}