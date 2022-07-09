import React from 'react';
import "./styles/Navbar.css"
import {Link} from "react-router-dom" ;

const Navbar = () => {
    return ( 
        <nav className='sum'>
            <div className='logo'>
            <Link to="/">StreamWithMe</Link>
            </div>
            <div className="item">
                <ul className="ul">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Anmelden</Link>
                    </li>
                    <li>
                        <Link to="/">Registrieren</Link>
                    </li>
                </ul>
            </div>
        </nav>
        )
}

export default Navbar
