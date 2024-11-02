import FilterVariation from "./FilterVariation";
import './css/Main.css'

export default function Main(){
    return (
        <main class='main'>
            <div className="container">
                <div className="path__container">
                    <p className="path">тренировки  ...</p>
                </div>
                <div className="main__desktop">
                    <div className="main__filter__container">
                        <p className="filter__text">фильтры</p>
                        <div className="filter__variations">
                            <FilterVariation title='тип тренировки' />
                            <FilterVariation title='уровень сложности' />
                            <FilterVariation title='формат' />
                            <FilterVariation title='время' />
                        </div>
                        
                    </div>
                    <div className="main__search__and__cards">
                        <div className="main__search__container">
                            <input type="text" className="search__input" placeholder="поиск" />
                        </div>
                        <div className="main__sort">
                            сортировка: 
                        </div>
                        <div className="main__cards__container">
                            <ul className="main__cards__list">
                                {/* <Training /> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}