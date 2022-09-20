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
    const [title,setTitle] = useState("StreamWithMe");
    const [roomTitle,setRoomTitle] = useState(room);

    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate] );

    useEffect(()=>{checkTitle()});

    const checkTitle = async () => {
        if (userState.get()) {
            const data = await getUsers();
            const users = data.users;
            if(users===undefined){
                setTitle("StreamWithMe")
                return;
            }
            const u = users.find((u)=> userState.get()===u.id)
            setTitle("StreamWith"+u.name);
        }
        else setTitle("StreamWithMe");
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
            <div className='logo'>
                <p tabIndex="0" className="logo-link" onClick={handleNavigate} onKeyDown={handleKeyDown} >{title}</p>
            </div>
            <div className='logo'>
                <p className='logo-link' tabIndex="0" onClick={copyLink}>{roomTitle}</p>
            </div>
            <div className='logo'>
                <p className="logo-link" tabIndex="0" onClick={toggleHelp}>Help</p>
            </div>
        </div>
    );
};
export default Navbar;
