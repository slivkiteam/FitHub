﻿import FilterVariation from "./FilterVariation";
import './css/Main.css'
import Training from "./Training";

export default function Main({data, currentPage, getAllContacts}){
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
                                {data?.content?.length > 0 && data.content.map((training) => <Training training={training} key={training.id} />)}
                            </ul>
                            {data?.content?.length > 0 && data?.totalPages > 1 && 
                            <div className="pagination">
                                <a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ""}>&laquo;</a>    
                                {data && [...Array(data.totalPages).keys()].map((page) =>
                                     <a onClick={() => getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                                <a onClick={() => (currentPage + 1 != data.totalPages) ? getAllContacts(currentPage + 1) : ""} className={data.totalPages === currentPage + 1 ? 'disabled' : ""}>&raquo;</a>    
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}