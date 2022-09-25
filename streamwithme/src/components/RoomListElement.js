import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/RoomListElement.css";
import { roomState } from '../Room';
import { userState } from '../App';
import { popupInputState } from './InputUser';
import { roomTitleState } from './Navbar';
import { getRoomUsers, joinRoom } from './API/RoomAPI';
import { useEffect } from 'react';
/* 
Ein RoomListElement zeigt die Präsenz eines Raumes und wie viele Nutzer in diesem sind.
Mittels des Clicks oder Enter kann der Raum betreten werden.
Falls man noch kein User ist, erscheint ein Popup zur Erstellung.
 */
const RoomListElement = (props) => {
    const [roomName] = useState(props.name);
    const [viewers,setViewers] = useState();
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    
    useEffect(()=>{ getViewers(); });
    const getViewers = async () => {
        const data = await getRoomUsers(roomName);
        const users = data.users;
        setViewers( users.length + (users.length === 1 ? " streamt" : " streamen"));
    }

    const handleKeyDown = (e) => { if (e.key === "Enter") enterRoom(); }
    const enterRoom = async () => {
        roomState.set(roomName);
        roomTitleState.set(roomName);
        if (userState.get() === false) {
            popupInputState.set(true);
            console.log("Blocked join room, user is not set");
        } else {
            joinRoom(roomName, userState.get());                
            navigateToRoom();
        }
    };

    return (
        <div tabIndex="0" className='room-element' onClick={enterRoom} onKeyDown={handleKeyDown}>
            <span className='room-element-info accessibility'>Raum</span>
            <span className='room-element-name'>{roomName}</span>
            <span className='room-element-info'>{viewers}</span>
        </div>
    );
};

export default RoomListElement;