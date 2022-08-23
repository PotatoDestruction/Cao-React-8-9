import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import './AddForm.css'


const AddFrom = () => {

    return (
        <div>
            <NavBar name1='Pets' link1='/' name2='Medications' link2='/meds' />
            <h1>Add Pet</h1>
            <div className="formBox">
                <form onSubmit={(e) => {
                    e.preventDefault();

                    fetch('http://localhost:8080/v1/pets', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: e.target.name.value,
                            dob: e.target.date.value,
                            client_email: e.target.email.value,
                            archived: false
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            
                            setTimeout(window.location.href = 'http://localhost:3000')
                        }, 1000)
                        .catch(error => console.log(error))

                }}>
                    <div className="inpBox">
                        <label>Pet name:</label>
                        <input type="text" name="name" />
                    </div>
                    <div className="inpBox">
                        <label>Date of birth:</label>
                        <input type="date" name="date" />
                    </div>
                    <div className="inpBox">
                        <label>Email:</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="form-button-wrap">
                        <Button type='submit' className='form-button' value='Add' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFrom;