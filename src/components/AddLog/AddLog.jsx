import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import './AddLog.css'

const AddLog = () => {
    let getPara = new URL(window.location.href);
    let params = getPara.search;
    let getInfo = new URLSearchParams(params);
    let petId = getInfo.get('id');
    let getPetName = getInfo.get('name');
    console.log(getPetName, petId);

    return (
        <div>
            <NavBar link1='/' name1='Pets' link2='/meds' name2='Medications' />
            <div className="header">
                <h1>Create new Log for: <span>{getPetName}</span></h1>
            </div>
            <form className="logForm" onSubmit={(e) => {
                e.preventDefault();

                fetch('http://localhost:8080/v1/logs', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pet_id: petId,
                        status: e.target.status.value,
                        description: e.target.description.value,
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        setTimeout(window.location.href = `http://localhost:3000/logs?id=${petId}&name=${getPetName}`)
                    }, 1000)
                    .catch(error => console.log(error))

            }}>
                <div className="inpBox">
                    <label>Status:</label>
                    <input type="text" name="status" />
                </div>
                <div className="inpBox">
                    <label>Description:</label>
                    <div>
                        <textarea name="description" rows="4" cols="50"></textarea>
                    </div>
                </div>
                <div className="form-button-wrap">
                    <Button type='submit' className='form-button' value='Add' />
                </div>
            </form>
        </div>
    )
}

export default AddLog;