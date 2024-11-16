import FilterVariation from "./FilterVariation";
import './css/Main.css';
import Training from "./Training";
import { useState, useCallback, useEffect } from "react";
import SortTrainings from "./Sort";
import axios from "axios";

export default function Main({ data, currentPage, getAllContacts }) {
    const [searchText, setSearchText] = useState('Поиск');
    const [selectedTags, setSelectedTags] = useState({}); // Состояние для выбранных тегов
    const [filteredData, setFilteredData] = useState(data.content); // Состояние для отфильтрованных данных
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const [currentPageState, setCurrentPageState] = useState(currentPage); // Текущая страница

    // Формирование строки запроса с фильтрами
    const buildSearchParam = () => {
        let searchParam = "?search=";
        let arrayOfFilterType = ["category", "status", "place", "durationInMinutes"];
    
        Object.entries(selectedTags).forEach(([key, value], index) => {
            if (value.length > 0) {
                const filterKey = arrayOfFilterType[index];
                const filterValue = value.map(a => a.toUpperCase()).join(","); // Преобразуем теги в строку через запятую
    
                if (filterKey !== "durationInMinutes") {
                    searchParam += `${filterKey}:${filterValue},`; // Добавляем в запрос с разделителем запятая
                } else {
                    searchParam += `${filterKey}>${filterValue},`; // Для durationInMinutes добавляем в другой формат
                }
            }
        });
    
        // Убираем последнюю запятую из строки запроса, если она есть
        if (searchParam.endsWith(',')) {
            searchParam = searchParam.slice(0, -1);
        }
    
        console.log("Формированный запрос:", searchParam); // Логирование запроса
        return searchParam;
    };

    // Запрос с фильтрами
    const handleSetFilter = async (page = 0) => {
        const searchParam = buildSearchParam(); // Получаем строку запроса с фильтрами
        try {
            const response = await axios.get(`http://localhost:8081/trains${searchParam}&page=${page}&size=10`);
            console.log("Данные с сервера:", response.data);
            setFilteredData(response.data.content); // Обновляем отфильтрованные данные
            setTotalPages(response.data.totalPages); // Сохраняем количество страниц
        } catch (error) {
            console.error("Ошибка при запросе:", error);
        }
    };

    // Обработчик для выбора тегов
    const handleTagSelection = useCallback((title, tags) => {
        setSelectedTags((prevSelectedTags) => {
            const updatedTags = { ...prevSelectedTags, [title]: tags };
            console.log("Текущие выбранные теги:", updatedTags);
            return updatedTags;
        });
    }, []);

    // Эффект для обновления данных при изменении выбранных тегов или страницы
    useEffect(() => {
        // Сброс текущей страницы на 0 при изменении тегов
        setCurrentPageState(0);
    }, [selectedTags]);

    useEffect(() => {
        handleSetFilter(currentPageState); // Запрашиваем данные для текущей страницы
    }, [selectedTags, currentPageState]); // Зависит от выбранных тегов и текущей страницы

    // Обработчик изменения страницы
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPageState(newPage); // Обновляем текущую страницу
        }
    };

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
                                {filteredData?.length > 0 && filteredData.map((training) => <Training training={training} key={training.id} />)}
                            </ul>
                            {filteredData?.length > 0 && totalPages > 1 && (
                                <div className="pagination">
                                    <a onClick={() => handlePageChange(currentPageState - 1)} className={currentPageState === 0 ? 'disabled' : ""}>&laquo;</a>
                                    {Array.from({ length: totalPages }).map((_, page) => (
                                        <a
                                            onClick={() => handlePageChange(page)}
                                            className={currentPageState === page ? 'active' : ''}
                                            key={page}
                                        >
                                            {page + 1}
                                        </a>
                                    ))}
                                    <a onClick={() => handlePageChange(currentPageState + 1)} className={currentPageState === totalPages - 1 ? 'disabled' : ""}>&raquo;</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
