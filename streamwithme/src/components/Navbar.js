import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { hookstate, useHookstate } from '@hookstate/core';
import { leaveRoom } from './API/RoomAPI';
import { user } from '../App';

export const titleState = hookstate("");

const Navbar = () => {
    useHookstate(titleState);
    const room = titleState.get();
    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate] );
    const handleNavigate = () => {
        if (room !== "") leaveRoom(room, user);
        navigateToHome();
    }

    return (
        <div className='sum'>
            <div className='logo'>
                <p className="logo-link" onClick={handleNavigate} >StreamWithMe</p>
            </div>
            <div className='logo'>
                {room}
            </div>
            <div className='help'>
                <Link to="/Help">Help</Link>
            </div>
        </div>
    );
};
export default Navbar;
