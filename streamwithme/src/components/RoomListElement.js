import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/RoomListElement.css";
import { roomState } from '../Room';
import { userState } from '../App';
import { popupState } from './InputUser';
import { titleState } from './Navbar';
import { joinRoom } from './API/RoomAPI';

const RoomListElement = (props) => {
    const [roomName] = useState(props.name);
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    
    const handleKeyDown = (e) => { if (e.key === "Enter") enterRoom(); }
    const enterRoom = async () => {
        roomState.set(roomName);
        titleState.set(roomName);
        if (userState.get() === false) {
            popupState.set(true);
            console.log("Blocked join room, user is not set");
        } else {
            joinRoom(roomName, userState.get());
            navigateToRoom();
        }
    };

    return (
        <li tabIndex="0" className='element' onClick={enterRoom} onKeyDown={handleKeyDown}>
            {roomName}
        </li>
    );
};

export default RoomListElement;