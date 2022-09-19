import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/navbar.css";
import { hookstate, useHookstate } from '@hookstate/core';
import { leaveRoom } from './API/RoomAPI';
import { userState } from '../App';

export const titleState = hookstate("");

const Navbar = () => {
    useHookstate(titleState);
    const room = titleState.get();
    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate] );
    const handleKeyDown = (e) => { if (e.key === "Enter") handleNavigate(); }
    const handleNavigate = () => {
        if (room !== false) {
            titleState.set(false);
            leaveRoom(room, userState.get());
        }
        navigateToHome();
    }
    const toggleHelp = () => {
        // TODO
    }
    const copyLink = () => {
        // TODO
    }

    return (
        <div className='sum'>
            <div className='logo'>
                <p tabIndex="0" className="logo-link" onClick={handleNavigate} onKeyDown={handleKeyDown} >StreamWithMe</p>
            </div>
            <div className='logo'>
                <p className='logo-link' tabIndex="0" onClick={copyLink}>{room}</p>
            </div>
            <div className='logo'>
                <p className="logo-link" tabIndex="0" onClick={toggleHelp}>Help</p>
            </div>
        </div>
    );
};
export default Navbar;
