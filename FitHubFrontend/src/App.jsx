import { useEffect, useState } from 'react';
import { getContacts } from './api/TrainService';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Trainings from './components/trainings/Trainings';
import TrainingDetail from './components/trainings/TrainingDetail';
import Login from './components/login/LoginPage';
import UserPage from './components/user-page/UserPage';
import Registration from './components/registration/Registration';



function App() {
  
  const [allData, setAllData] = useState({})
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTags, setSelectedTags] = useState({
    trainingType: null,
    difficulty: null,
    format: null,
    time: null,
  });

  const getAllContacts = async (page = 0) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page);
      setData(data);
    } catch {
      console.log("Error loading contacts");
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  useEffect(() => {
    document.title = "FitHub"; // Общий title
  }, []);

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = "./logo.svg"; // Путь к новой иконке
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/trains" />} />
        <Route path="/trains/:id" element={<TrainingDetail />} />
        <Route
          path="/trains"
          element={
            <Trainings
              data={data}
              currentPage={currentPage}
              getAllContacts={getAllContacts}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags} // Передаем setSelectedTags в Trainings
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
    </main>
  );
}

export default App;
