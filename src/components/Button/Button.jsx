import './Button.css'

const Button = ({value, onClick, className, type, id}) => {

    

    return(
        <button type={type} onClick={onClick} id={id} className={className}>{value}</button>
    )
}

export default Button;