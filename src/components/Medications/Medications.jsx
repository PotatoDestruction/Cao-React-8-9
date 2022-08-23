import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import InfoBox from "../InfoBox/InfoBox";
import { useEffect } from "react";
import { useState } from "react";

const Medications = () => {

    const [meds, setMeds] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/v1/medications')
        .then(res => res.json())
        .then(res => setMeds(res))
        .catch(error => {
            console.log(error)
            return
        })
    }, [])

    function toAddMed() {
        window.location.href = 'http://localhost:3000/addMeds'
    }

    return(
        <div>
            <NavBar link1='/' name1='Pets' link2='#' name2=''/>
            <div className="header">
                <h1>Medication List</h1>
                <div className="h-button-wrap">
                    <Button className='addButton' value='ADD MEDICATION' onClick={toAddMed}/>
                </div>
            </div>
            {!meds && <h1>LOADING . . .</h1>}
            <div className="petContainer"> 
            {meds && meds.map((med, i) => {
                return (
                    <InfoBox
                        key={i}
                        name={med.name}
                        email={med.description}
                        noButtons='noButtons'

                    />
                )
            })}
            </div>
        </div>
        
    )
}

export default Medications;