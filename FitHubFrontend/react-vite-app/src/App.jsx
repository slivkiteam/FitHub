import { useEffect, useState } from 'react';
import { getContacts } from './api/TrainService';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Trainings from './components/trainings/Trainings';
import TrainingDetail from './components/trainings/TrainingDetail';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  
  const getAllContacts = async (page = 0) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page);
      setData(data);
    } catch {
      console.log("Error loading contacts");
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/trains" />} />
        <Route path="/trains/:id" element={<TrainingDetail />} />
        <Route path="/trains" element={<Trainings data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
      </Routes>
    </main>
  );
}

export default App;
