import { useEffect, useState } from 'react';
import { getContacts } from './api/TrainService';
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Trainings from './components/trainings/Trainings';
function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const getAllContacts = async (page = 0) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page);
      setData(data);
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <main>
      <div>
      <Routes>
        <Route path="/" element={<Navigate to={'/trains'}/>}/>
        <Route path="/trains" element={<Trainings data={data} currentPage={currentPage} getAllContacts={getAllContacts}/>}/>
      </Routes>
      </div>
    </main>
  )
}

export default App
