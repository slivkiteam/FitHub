import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import MainCreateTraining from "../create-training/Main";
import MainFooter from '../blocks/MainFooter';
import StartPage from '../startPage/StartPage';
import { useLocation } from 'react-router-dom';
import UserPage from '../user-page/UserPage';

function Trainings({ data, currentPage, getAllContacts, selectedTags, setSelectedTags }) {
  const [mainType, setMainType] = useState('startPage'); // Состояние для mainType

  // Получаем состояние из navigate, если оно было передано
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.mainType) {
      setMainType(location.state.mainType);
    }
  }, [location]);

  // Функция для изменения mainType, которая передается в Header
  const handleTypeChange = (type) => {
    setMainType(type);
  };

  return (
    <>
      <Header mainType={mainType} onTypeChange={handleTypeChange} />
      {mainType === 'trainings' ? (
        <Main data={data} currentPage={currentPage} getAllContacts={getAllContacts} />
      ) : mainType === 'startPage' ? (
        <StartPage data={data} onTypeChange={handleTypeChange}/>
      ) : mainType === 'user-page' ? (
        <UserPage />
      ) : (
        <MainCreateTraining selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      )}
      <MainFooter />
    </>
  );
}

export default Trainings;