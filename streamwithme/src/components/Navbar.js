import React from 'react';
import "./styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='sum'>
            <div className='logo'>
                <Link to="/">StreamWithMe</Link>
            </div>
        </nav>
    );
};
export default Navbar;
