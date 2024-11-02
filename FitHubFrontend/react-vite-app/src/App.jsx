import { useEffect, useState } from 'react';
import { getContacts } from './api/TrainService';
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Trainings from './components/trainings/Trainings';
function App() {
  const [data, setData] = useState({});
  const getAllContacts = async () => {
    try {
      const { data } = await getContacts();
      setData(data);
      // console.log(data);
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <main className='main__container'>
      <div>
      <Routes>
        <Route path="/" element={<Navigate to={'/trains'}/>}/>
        <Route path="/trains" element={<Trainings data={data}/>}/>
      </Routes>
      </div>
    </main>
  )
}

export default App
