import React, { useState } from 'react';
import Training from './Training';
import Filter from './Filter';
import Search from './Search';


const FilterTrainingDesktop = () => {
    const [trainings, setTrainings] = useState([
        { id: 1, title: "tren" },
        { id: 2, title: "megatren" },
        { id: 3, title: "megatren" },
        { id: 4, title: "megatren" },
        { id: 5, title: "megatren" },
        { id: 6, title: "megatren" },
        { id: 7, title: "megatren" },
        { id: 7, title: "megatren" },
    ]);

    return (
        <div className="filter-training-desktop">
            <ul className="filter-trainings-list">
                <Filter />
                <div className="search-and-cards">
                    <Search />
                    {trainings.map(training => (
                        <Training title={training.title}/>
                    ))}
                </div>
            </ul>
        </div>
    );
};
export default FilterTrainingDesktop;
