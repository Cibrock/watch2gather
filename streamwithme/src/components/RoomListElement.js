import React, { useCallback, useState } from 'react';
import "./styles/RoomListElement.css";
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../Room';
import { user } from '../App';
import { setPopup } from './InputUser';

const RoomListElement = (props) => {
    const [name] = useState(props.name);
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);

    const enterRoom = () => {
        setRoom.set(name);
        if (user === undefined) {
            setPopup.set(true);
            return console.log("Blocked join room, user is " + user);
        }
        navigateToRoom();
    };

    return (
        <li className='element' onClick={enterRoom}>
            {name}
        </li>
    );
};

export default RoomListElement;