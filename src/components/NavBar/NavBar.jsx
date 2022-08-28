import { Link } from "react-router-dom";
import './NavBar.css'


const NavBar = ({ link1, link2, name1, name2 }) => {


    return(
        <nav>
            <div className="imgWrap">
                <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="pet" />
            </div>

            <div className="linkWrap">
                <Link className="link" to={link1} >{name1}</Link>
                <Link className="link" to={link2} >{name2}</Link>
            </div>

            <div>
            </div>
            
        </nav>
    )
}

export default NavBar;