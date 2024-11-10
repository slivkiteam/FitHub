import FilterVariation from "./FilterVariation";
import './css/Main.css';
import Training from "./Training";
import { useState, useCallback } from "react";
import SortTrainings from "./Sort";

export default function Main({ data, currentPage, getAllContacts }) {
    const [searchText, setSearchText] = useState('Поиск');
    const [selectedTags, setSelectedTags] = useState({});

    const handleTagSelection = useCallback((title, tags) => {
        setSelectedTags((prevSelectedTags) => {
            const updatedTags = { ...prevSelectedTags, [title]: tags };
            console.log("Текущие выбранные теги:", updatedTags);
            return updatedTags;
        });
    }, []);

    return (
        <main className='main'>
            <div className="container">
                <div className="path__container">
                    <p className="path">тренировки  ...</p>
                </div>
                <div className="main__desktop">
                    <div className="main__filter__container">
                        <p className="filter__text">фильтры</p>
                        <div className="filter__variations">
                            <FilterVariation title='тип тренировки' tags={['кардио', 'йога', 'силовая', 'круговая']} updateSelectedTags={handleTagSelection} />
                            <FilterVariation title='уровень сложности' tags={['легко', 'средне', 'сложно']} updateSelectedTags={handleTagSelection} />
                            <FilterVariation title='формат' tags={['дом', 'улица', 'зал']} updateSelectedTags={handleTagSelection} />
                            <FilterVariation title='время' tags={['10-15 мин', '30-60 мин', '1 час +']} updateSelectedTags={handleTagSelection} />
                        </div>
                    </div>
                    <div className="main__search__and__cards">
                        <div className="main__search__container">
                            <input type="text" className="search__input" placeholder={searchText} />
                        </div>
                        <SortTrainings />
                        <div className="main__cards__container">
                            <ul className="main__cards__list">
                                {data?.content?.length > 0 && data.content.map((training) => <Training training={training} key={training.id} />)}
                            </ul>
                            {data?.content?.length > 0 && data?.totalPages > 1 &&
                                <div className="pagination">
                                    <a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ""}>&laquo;</a>
                                    {data && [...Array(data.totalPages).keys()].map((page) =>
                                        <a onClick={() => getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                                    <a onClick={() => (currentPage + 1 !== data.totalPages) ? getAllContacts(currentPage + 1) : ""} className={data.totalPages === currentPage + 1 ? 'disabled' : ""}>&raquo;</a>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
