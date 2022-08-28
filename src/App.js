import { Routes, Route, Layout } from "react-router-dom";
import Main from './components/Main/Main'
import './App.css';
import AddFrom from "./components/AddFrom/AddForm";
import Health from "./components/Health/Health";
import AddLog from "./components/AddLog/AddLog";
import Medications from "./components/Medications/Medications";
import AddMed from "./components/AddMed/AddMed";
import AddPrescription from "./components/Prescriptions/AddPrescription";
import { PageBackgorundColor, lightTheme, darkTheme } from './components/ContextTheme/ContextTheme'
import { useContext, useEffect, useState } from 'react'
import Button from "./components/Button/Button";




function App() {
  const bg = localStorage.getItem('backGround')


  const [theme, setTheme] = useState(lightTheme)
  const [themeName, setThemeName] = useState('set Dark')

  useEffect(() => {
    if(lightTheme === theme){
    localStorage.setItem('backGround', JSON.stringify(theme))
    } 
    {darkTheme === theme && localStorage.setItem('backGround', JSON.stringify(theme))}
  }, [themeName])

  function changeTheme() {
    if(theme === lightTheme){
      setTheme(darkTheme)
      setThemeName('set Light')
    }else  {
      setTheme(lightTheme)
      setThemeName('set Dark')
    }
  }


  return (
    <div className="App" style={theme}>
      <PageBackgorundColor.Provider value={themeName}>
        <Button value={themeName} onClick={changeTheme}/>
      </PageBackgorundColor.Provider>
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
