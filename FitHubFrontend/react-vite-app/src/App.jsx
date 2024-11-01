import { useEffect, useState } from 'react';
import { getContacts } from './api/TrainService';
import './App.css';
import Trainings from './Trainings_Page/Trainings';
import SignIn from './Sign_In_Page/SignIn';


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
    <SignIn />
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
