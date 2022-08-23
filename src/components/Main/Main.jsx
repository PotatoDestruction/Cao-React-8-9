import { useState } from "react";
import { useEffect } from "react";
import Button from "../Button/Button";
import InfoBox from "../InfoBox/InfoBox";
import NavBar from "../NavBar/NavBar";


import './Main.css'


const Main = () => {
    let [petData, setPetData] = useState(null)
    let [refresh, setRefresh] = useState(0)

    useEffect(() => {
        fetch('http://localhost:8080/v1/pets')
            .then(res => res.json())
            .then(res => setPetData(res))
            .catch(error => console.log(error))
    }, [refresh])

    function archivePet(id) {
        fetch(`http://localhost:8080/v1/pets/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                console.log('archived')
                setRefresh(refresh + 1)
            })
            .catch(error => console.log(error))
    }

    function toAdd() {
        window.location.href = 'http://localhost:3000/add-pet'
    }

    function toLogs(id, name) {
        window.location.href = `http://localhost:3000/logs?id=${id}&name=${name}`
    }

    return (
        <div>
            <NavBar  link1='/' name1='Pets' link2='/meds' name2='Medications'/>
            <div className="header">
                <h1>Pet List</h1>
                <div className="h-button-wrap">
                    <Button className='addButton' value='ADD PET' onClick={toAdd}/>
                </div>
            </div>
            {!petData && <h1>LOADING . . . </h1>}
            <div className="petContainer">
                {petData && petData.map((pet, i) => {

                      var date = new Date(pet.dob);
                      var dd = String(date.getDate()).padStart(2, '0');
                      var mm = String(date.getMonth() + 1).padStart(2, '0');
                      var yyyy = date.getFullYear();
                      date = yyyy + '-' + mm + '-' + dd;

                    return (
                        <InfoBox
                            key={i}
                            name={pet.name}
                            dob={date}
                            email={pet.client_email}
                            onClick={() => archivePet(pet.id) }
                            toLogs={() => {toLogs(pet.id, pet.name)}}
                        />
                    )
                })}
            </div>
            <div className="copy">Copyright @ VetBee 999. All right reserved.</div>
        </div>
    )
}
export default Main;