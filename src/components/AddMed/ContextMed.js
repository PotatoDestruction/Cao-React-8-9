import { useContext } from "react";

export function postMeds(med){
    fetch('http://localhost:8080/v1/medications', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(med)
                })
                    .then(res => res.json())
                    .then(res => {
                        setTimeout(window.location.href = `http://localhost:3000/meds`)
                    }, 1000)
                    .catch(error => console.log(error))
}