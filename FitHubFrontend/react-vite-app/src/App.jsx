import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { getContacts } from './api/TrainService';
import './App.css';
import Home from './Home';
import Training from './TrainingsPage/Training';
import Trainings from './TrainingsPage/Trainings';


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
    <Trainings />
    {/* <main>
      <div>
      <Routes>
      <Route path="/" element={<Navigate to={'/trains'}/>}/>
      <Route path="/trains" element={<Trainings data={data}/>}/>
      </Routes>
      </div>
    </main> */
    }
    </>
  )
}

export default App
