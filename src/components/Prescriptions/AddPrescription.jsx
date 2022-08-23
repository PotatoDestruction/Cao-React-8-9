import NavBar from "../NavBar/NavBar"
import Button from "../Button/Button";
import './AddPrescription.css'
import { useEffect } from "react";
import { useState } from "react";

const AddPrescription = () => {
    let getPara = new URL(window.location.href);
    let params = getPara.search;
    let getInfo = new URLSearchParams(params);
    let petId = getInfo.get('id');
    let getPetName = getInfo.get('name');

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

    return (
        <div>
            <div>
                <NavBar link1='/' name1='Pets' link2={`/logs?id=${petId}&name=${getPetName}`} name2='Logs' />
                <div className="header">
                    <h1>Add Prescription</h1>
                </div>
                <div className="formBox">
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        fetch('http://localhost:8080/v1/prescriptions', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                medication_id: e.target.select.value,
                                pet_id: petId,
                                comment: e.target.comment.value
                            })
                        })
                            .then(res => res.json())
                            .then(res => {
                                setTimeout(window.location.href = `http://localhost:3000/logs?id=${petId}&name=${getPetName}`)
                            }, 1000)
                            .catch(error => console.log(error))

                        console.log(e.target.select.value)
                    }}>
                        <div className="inpBox">
                            <label>Select Medication:</label>
                            <select name="select">
                                {meds && meds.map((med, i) => {
                                    return(
                                        <option key={i} value={med.id}>{med.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="inpBox">
                            <label>Comment:</label>
                            <div>
                                <textarea name="comment" cols="30" rows="10"></textarea>
                            </div>
                        </div>

                        <div className="form-button-wrap">
                            <Button type='submit' className='form-button' value='Add' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPrescription;