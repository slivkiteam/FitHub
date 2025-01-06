import FilterVariation from "./FilterVariation";
import './css/Main.css';
import Training from "./Training";
import { useState, useCallback, useEffect } from "react";
import SortTrainings from "./Sort";
import axios from "axios";

export default function Main({ data, currentPage, getAllContacts }) {
    const [searchText, setSearchText] = useState('');
    const [selectedTags, setSelectedTags] = useState({}); // Состояние для выбранных тегов
    const [filteredData, setFilteredData] = useState(data.content); // Состояние для отфильтрованных данных
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const [currentPageState, setCurrentPageState] = useState(currentPage); // Текущая страница
    const [sortOrder, setSortOrder] = useState('less'); // Порядок сортировки: "more" или "less"

    // Формирование строки запроса с фильтрами
    const buildSearchParam = () => {
        let searchParam = "?search=";
        let arrayOfFilterType = ["category", "status", "place", "durationInMinutes"];

        // Добавляем параметр поиска по названию
        if (searchText && searchText !== 'Поиск') {
            searchParam += `title:${searchText},`;
        }

        Object.entries(selectedTags).forEach(([key, value], index) => {
            if (value.length > 0) {
                const filterKey = arrayOfFilterType[index];

                // Для каждого значения создаём отдельный параметр
                value.forEach((val) => {
                    searchParam += `${filterKey}:${val.toUpperCase()},`;
                });

                // Обработка времени для durationInMinutes
                if (filterKey === "durationInMinutes") {
                    value.forEach((timeRange) => {
                        if (timeRange === "10-15 мин") {
                            searchParam += `${filterKey}>10,${filterKey}<15,`;
                        } else if (timeRange === "30-60 мин") {
                            searchParam += `${filterKey}>30,${filterKey}<60,`;
                        } else if (timeRange === "1 час +") {
                            searchParam += `${filterKey}>61,`;
                        }
                    });
                }
            }
        });

        // Добавляем параметр сортировки
        searchParam += `&sort=${sortOrder},`;

        // Убираем последнюю запятую из строки запроса, если она есть
        if (searchParam.endsWith(',')) {
            searchParam = searchParam.slice(0, -1);
        }

        console.log("Формированный запрос:", searchParam); // Логирование запроса
        return searchParam;
    };

    // Обработчик изменения текста в поле поиска
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
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

    // Обработчик изменения сортировки
    const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
    };

    // Эффект для обновления данных при изменении выбранных тегов или страницы
    useEffect(() => {
        // Сброс текущей страницы на 0 при изменении тегов
        setCurrentPageState(0);
    }, [selectedTags]);

    useEffect(() => {
        handleSetFilter(currentPageState); // Запрашиваем данные для текущей страницы
    }, [selectedTags, currentPageState, searchText, sortOrder]);  // Теперь зависит и от sortOrder

    // Обработчик изменения страницы
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPageState(newPage); // Обновляем текущую страницу
        }
    };

    return (
        <main className='main'>
            <div className="container">
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
                            <input
                                type="text"
                                className="search__input"
                                placeholder='Поиск'
                                value={searchText}
                                onChange={handleSearchChange}  // Обработчик изменения текста
                            />
                        </div>
                        <SortTrainings onSortChange={handleSortChange} />
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