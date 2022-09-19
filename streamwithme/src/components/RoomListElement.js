import React, { useCallback, useState } from 'react';
import "./styles/RoomListElement.css";
import { useNavigate } from 'react-router-dom';
import { roomState } from '../Room';
import { user } from '../App';
import { popupState } from './InputUser';
import { titleState } from './Navbar';
import { joinRoom } from './API/RoomAPI';

const RoomListElement = (props) => {
    const [roomName] = useState(props.name);
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);

    const enterRoom = async () => {
        if (user === undefined) {
            popupState.set(true);
            console.log("Blocked join room, user is " + user);
            return;
        } else {
            roomState.set(roomName);
            titleState.set(roomName);
            joinRoom(roomName, user);
            navigateToRoom();
        }
    };

    return (
        <li tabindex="0" className='element' onClick={enterRoom}>
            {roomName}
        </li>
    );
};

export default RoomListElement;