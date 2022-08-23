import Button from '../Button/Button';
import './InfoBox.css'

const InfoBox = ({name, email, dob, onClick, toLogs, noButtons}) => {

    return(
        <div className='box'>
            <h2>{name}</h2>
            <div>
            <p className='p1'>{dob}</p>
            <p className='p1'>{email}</p>
            </div>
            <div>
                <Button onClick={toLogs} className='view' id={noButtons} value='VIEW LOG'/>
                <Button onClick={onClick} className='delete' id={noButtons} value='DELETE'/>
            </div>
        </div>
    )
}

export default InfoBox;