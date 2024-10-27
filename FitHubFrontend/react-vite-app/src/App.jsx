import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { getContacts } from './api/TrainService';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const getAllContacts = async () => {
    try {
      const { data } = await getContacts();
      setData(data);
      console.log(data);
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
    {/* <main>
      <div>
      <Routes>
      <Route path="/" element={<Navigate to={'/trains'}/>}/>
      <Route path="/trains" element={<Trainings data={data}/>}/>
      </Routes>
      </div>
    </main> */}
    <h1>Пупа + Лупа = <img src={reactLogo} alt=""/></h1>
    </>
  )
}

export default App
