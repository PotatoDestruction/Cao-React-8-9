import { Routes, Route } from "react-router-dom";
import Main from './components/Main/Main'
import './App.css';
import AddFrom from "./components/AddFrom/AddForm";
import Health from "./components/Health/Health";
import AddLog from "./components/AddLog/AddLog";
import Medications from "./components/Medications/Medications";
import AddMed from "./components/AddMed/AddMed";
import AddPrescription from "./components/Prescriptions/AddPrescription";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/add-pet' element={<AddFrom />} />
        <Route path='/logs' element={<Health />} />
        <Route path='/logForm' element={<AddLog />} />
        <Route path='/meds' element={<Medications />} />
        <Route path='/addMeds' element={<AddMed />} />
        <Route path='/addPrescription' element={<AddPrescription />} />
      </Routes>
    </div>
  );
}

export default App;
