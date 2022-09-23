import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/navbar.css";
import { hookstate, useHookstate } from '@hookstate/core';
import { leaveRoom } from './API/RoomAPI';
import { userState } from '../App';
import { getUsers } from './API/UserAPI';
import { popupHelpStatus } from './Help';

export const roomTitleState = hookstate("");

const Navbar = () => {
    useHookstate(roomTitleState);
    let linkIsVis = false;
    const room = roomTitleState.get();
    const [title,setTitle] = useState("Me");
    const [roomTitle,setRoomTitle] = useState(room);

    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate] );

    useEffect(()=>{checkTitle()});

    const checkTitle = async () => {
        if (userState.get()) {
            const data = await getUsers();
            const users = data.users;
            if(users===undefined){
                setTitle("Me")
            }else{
                const u = users.find((u)=> userState.get()===u.id)
                setTitle(u.name);
            }
        }
        else setTitle("Me");
    }

    const handleKeyDown = (e) => { if (e.key === "Enter") handleNavigate(); }
    const handleNavigate = () => {
        if (room !== false) {
            roomTitleState.set(false);
            leaveRoom(room, userState.get());
        }
        navigateToHome();
    }

    const toggleHelp = () => { popupHelpStatus.set(true); }

    const copyLink = () => {
        if (!linkIsVis){
            setRoomTitle("https://cibrock.github.io/watch2gather/#/"+room);
            navigator.clipboard.writeText("https://cibrock.github.io/watch2gather/#/"+room);
            setTimeout(()=>{ setRoomTitle(room); linkIsVis = false; },10000)
            linkIsVis = true;
        }
    }

    return (
        <div className='sum'>
            <div className='logo home'>
                <div tabIndex="0" role="HomeButton" className="logo-link" onClick={handleNavigate} onKeyDown={handleKeyDown} >
                    <span className='accessibility'>HomeButton</span>
                    <div className='logo-stream'>StreamWith</div>
                    <div className='logo-title'>{title}</div>
                </div>
            </div>
            <div className='logo title'>
                <span className='accessibility'>LinkGenerieren</span>
                <p className='logo-link' role="RoomLinkGenerator" tabIndex={roomTitle ? "0" : "-1" } onClick={copyLink}>{roomTitle}</p>
            </div>
            <div className='logo help'>
                <span className='accessibility'>HelpButton</span>
                <p className="logo-link" tabIndex="0" onClick={toggleHelp}>Hilfe</p>
            </div>
        </div>
    );
};
export default Navbar;
