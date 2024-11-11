import FilterVariation from "./FilterVariation";
import './css/Main.css';
import Training from "./Training";
import { useState, useCallback, useEffect } from "react";
import SortTrainings from "./Sort";

export default function Main({ data, currentPage, getAllContacts }) {
    const [searchText, setSearchText] = useState('Поиск');
    const [selectedTags, setSelectedTags] = useState({});
    const [paginationFlag, setPaginationFlag] = useState(true);

    // Обработчик для выбора тегов
    const handleTagSelection = useCallback((title, tags) => {
        setSelectedTags((prevSelectedTags) => {
            const updatedTags = { ...prevSelectedTags, [title]: tags };
            console.log("Текущие выбранные теги:", updatedTags);
            console.log(data.content); // Проверьте, сколько тренировок в данных

            return updatedTags;
            
        });
    }, []);

    // Функция для фильтрации данных по выбранным тегам
    const filterDataByTags = (data, selectedTags) => {
        return data?.content?.filter((training) => {
            let match = true;

            // Проверка на "Кардио" в категории "тип тренировки"
            if (selectedTags['тип тренировки']?.includes('кардио') && !training.category.category.toLowerCase().includes('кардио')) {
                match = false;
            }

            // Фильтрация по сложности
            if (selectedTags['уровень сложности']?.length > 0) {
                const selectedDifficulties = selectedTags['уровень сложности'];
                const trainingDifficulty = training.difficulty?.toLowerCase();
                if (!selectedDifficulties.includes(trainingDifficulty)) {
                    match = false;
                }
            }

            return match; // Возвращаем только те тренировки, которые соответствуют всем выбранным фильтрам
        });
    };

    // Отфильтрованные тренировки
    const filteredData = filterDataByTags(data, selectedTags);

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
                            {/* Если флаг пагинации включен, отображаем только текущую страницу */}
                            {paginationFlag === true ? (
                                <>
                                    <ul className="main__cards__list">
                                        {filteredData?.length > 0 && filteredData.map((training) => <Training training={training} key={training.id} />)}
                                    </ul>
                                    {filteredData?.length > 0 && data?.totalPages > 1 && (
                                        <div className="pagination">
                                            <a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ""}>&laquo;</a>
                                            {data && [...Array(data.totalPages).keys()].map((page) =>
                                                <a onClick={() => getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                                            <a onClick={() => (currentPage + 1 !== data.totalPages) ? getAllContacts(currentPage + 1) : ""} className={data.totalPages === currentPage + 1 ? 'disabled' : ""}>&raquo;</a>
                                        </div>
                                    )}
                                </>
                            ) : (
                                // Если пагинация отключена, показываем все тренировки
                                <ul className="main__cards__list">
                                    {filteredData?.length > 0 && filteredData.map((training) => <Training training={training} key={training.id} />)}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
