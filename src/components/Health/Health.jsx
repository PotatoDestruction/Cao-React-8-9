import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import InfoBox from "../InfoBox/InfoBox";
import './Health.css'
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";

function logReducer(state, action){

    switch(action.action){      
        case 'set_logs':
            return action.logs
        case 'set_null':
            return null
            default:
                console.log('error')
    }
    
}

function prescriptionReducer(state, action) {

    switch(action.action){      
        case 'set_pres':
            return action.pres
        case 'set_null':
            return null
            default:
                console.log('error')
    }

}

const Health = () => {


    let getPara = new URL(window.location.href);
    let params = getPara.search;
    let getInfo = new URLSearchParams(params);
    let petId = getInfo.get('id');
    let getPetName = getInfo.get('name');

    const [trigger, setTrigger] = useState(0);
    const [trigger2, setTrigger2] = useState(0);

    const [ log, dispatchLogs] = useReducer(logReducer, null)
    const [prescription, dispatchPrescriptions] = useReducer(prescriptionReducer, null)


    useEffect(() => {
        fetch(`http://localhost:8080/v1/logs/${petId}`)
            .then(res => res.json())
            .then(res => {
                if (res.message == 'This pet does not have any logs') {
                    return
                } else {                
                    dispatchLogs({action:'set_logs', logs: res})
                }

            })
            .catch(error => console.log(error))
    }, [trigger])

    useEffect(() => {
        fetch(`http://localhost:8080/v1/prescriptions/${petId}`)
            .then(res => res.json())
            .then(res => {
                if(res.length < 1) {
                    return
                }else {
                    dispatchPrescriptions({ action:'set_pres', pres: res})
                }
                
            })
            .catch(error => console.log(error))
    }, [trigger2])

    function toAddLogs() {
        window.location.href = `http://localhost:3000/logForm?id=${petId}&name=${getPetName}`
    }

    var testobj = null
    if (log && prescription) {
        testobj = [
            ...log,
            ...prescription
        ]

    } else
        if (log) {
            testobj = [
                ...log
            ]
        } else
            if (prescription) {
                testobj = [
                    ...prescription
                ]
            }


    return (
        <div>
            <NavBar link1='/' name1='Pets' link2='/Logs' name2='Logs' />
            <div className="header">
                <h1><span className="name">{getPetName}</span>: Health Records</h1>
                <div className="h-button-wrap">
                    <Button className='addPrescription' value='ADD PRESCRIPTION'
                        onClick={() => {
                            window.location.href = `http://localhost:3000/addPrescription?id=${petId}&name=${getPetName}`
                        }}
                    />
                    <Button className='addLogs' value='ADD LOG' onClick={toAddLogs} />
                </div>
            </div>

            <div className="filter">
                <h2>Display:</h2>

                <button className="clicked" onClick={(e) => {
                    e.target.className === 'clicked' ? e.target.className = 'unclicked' : e.target.className = 'clicked'

                    if (e.target.className === 'unclicked') {
                        dispatchLogs({action:'set_null', logs: null})
                    } else {
                        setTrigger(trigger + 1)
                    }
                }}>Logs</button>

                <button className="clicked" onClick={(e) => {
                    e.target.className === 'clicked' ? e.target.className = 'unclicked' : e.target.className = 'clicked'

                    if (e.target.className === 'unclicked') {
                        dispatchPrescriptions({action:'set_null', logs: null})
                    } else {
                        setTrigger2(trigger2 + 1)
                    }
                }}>Prescriptions</button>

            </div>
            {!log && !prescription && <h1>No data . . .</h1>}
            <div className="petContainer">
                {prescription && log && log.length > 0 && testobj.map((log, i) => {
                    var date = new Date(log.dob);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0');
                    var yyyy = date.getFullYear();
                    date = yyyy + '-' + mm + '-' + dd;

                    var pre = new Date();
                    var qq = String(pre.getDate()).padStart(2, '0');
                    var ww = String(pre.getMonth() + 1).padStart(2, '0');
                    var eeee = pre.getFullYear();
                    pre = eeee + '-' + ww + '-' + qq;

                    return (
                        <InfoBox
                            key={i}
                            name={log.status ? log.status : log.name}
                            dob={date === 'NaN-NaN-NaN' ? pre : date}
                            email={log.comment? log.comment : log.description}
                            noButtons='noButtons'
                        />
                    )
                })}

                {log && !prescription && log.length > 0 && log.map((log, i) => {
                    var date = new Date(log.dob);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0');
                    var yyyy = date.getFullYear();
                    date = yyyy + '-' + mm + '-' + dd;

                    return (
                        <InfoBox
                            key={i}
                            name={log.status}
                            dob={date}
                            email={log.description}
                            noButtons='noButtons'
                        />
                    )
                })}

                {!log && prescription && prescription.map((pr, i) => {
                    var pre = new Date();
                    var qq = String(pre.getDate()).padStart(2, '0');
                    var ww = String(pre.getMonth() + 1).padStart(2, '0');
                    var eeee = pre.getFullYear();
                    pre = eeee + '-' + ww + '-' + qq;

                    return (
                        <InfoBox
                            key={i}
                            name={pr.name}
                            dob={pre}
                            email={pr.comment}
                            noButtons='noButtons'
                        />
                    )
                })}

            </div>
        </div>
    )
}

export default Health;