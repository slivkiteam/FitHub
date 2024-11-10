import React, { useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import MainCreateTraining from "../create-training/Main";
import MainFooter from '../blocks/MainFooter';

function Trainings({ data, currentPage, getAllContacts }) {
    const [mainType, setMainType] = useState('trainings'); // Состояние для mainType



    // Функция для изменения mainType, которая передается в Header
    const handleTypeChange = (type) => {
        setMainType(type);
    };

    return (
        <>
            <Header mainType={mainType} 
                    onTypeChange={handleTypeChange} />
            
            {mainType === 'trainings' ? (
                <Main data={data} currentPage={currentPage} getAllContacts={getAllContacts} />
            ) : (
                <MainCreateTraining />
            )}
            
            <MainFooter />
        </>
    );
}

export default Trainings;
