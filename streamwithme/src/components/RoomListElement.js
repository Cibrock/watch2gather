import React, { useCallback, useState } from 'react';
import "./styles/RoomListElement.css";
import { useNavigate } from 'react-router-dom';
import { setRoomName } from '../Room';
import { user } from '../App';

const RoomListElement = (props) => {
    const [name] = useState(props.name);
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);

    const enterRoom = () => {
        if (user === undefined)
            return console.log("Blocked join room, user is " + user);
        setRoomName(name);
        navigateToRoom();
    };

    return (
        <li className='listelement' onClick={enterRoom}>
            {name}
        </li>
    );
};

export default RoomListElement;