import React,{useCallback} from 'react'
import "./styles/RoomListElement.css";
import {useNavigate} from 'react-router-dom';
import { setRoomName } from '../Room';
import { user } from '../App';

const RoomListElement = (props) => {
    const roomName = props.roomName
    const navigate      = useNavigate();
    const navigateToRoom = useCallback( () => navigate("/Room", { replace: true }), [navigate] );

    const enterRoom = () => {
        if (user===undefined)
            return console.log("Blocked join room, user is " + user);
        setRoomName(roomName)
        navigateToRoom()
    };

    return (
        <li className='listelement' key={roomName} onClick={enterRoom}>
            {roomName}
        </li>
    );
}

export default RoomListElement;