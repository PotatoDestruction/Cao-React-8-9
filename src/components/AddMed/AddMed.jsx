import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";

const AddMed = () => {

    return (
        <div>
            <NavBar link1='/' name1='Pets' link2='/meds' name2='Medications' />
            <div className="header">
                <h1>Add new Medication</h1>
            </div>
            <form className="logForm" onSubmit={(e) => {
                e.preventDefault();

                fetch('http://localhost:8080/v1/medications', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: e.target.medName.value,
                        description: e.target.description.value
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        setTimeout(window.location.href = `http://localhost:3000/meds`)
                    }, 1000)
                    .catch(error => console.log(error))

            }}>
                <div className="inpBox">
                    <label>New Medication:</label>
                    <input type="text" name="medName" />
                </div>
                <div className="inpBox">
                    <label>Description:</label>
                    <div>
                        <textarea name="description" rows="4" cols="50"/>
                    </div>
                </div>
                <div className="form-button-wrap">
                    <Button type='submit' className='form-button' value='Add' />
                </div>
            </form>
        </div>
    )
}

export default AddMed;