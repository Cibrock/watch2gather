import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/RoomListElement.css";
import { roomState } from '../Room';
import { userState } from '../App';
import { popupState } from './InputUser';
import { titleState } from './Navbar';
import { getRoomUsers, joinRoom } from './API/RoomAPI';
import { useEffect } from 'react';

const RoomListElement = (props) => {
    const [roomName] = useState(props.name);
    const [viewers,setViewers] = useState(props.watchers ? ("are " + props.watchers + " people") : ("is one person"));
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    
    useEffect(()=>{
        getViewers();
    });
    
    const getViewers = async () => {
        const data = await getRoomUsers(roomName);
        const users = data.users;
        setViewers(users.length === 1 ? "1 person is" : users.length + " people are ");
    }

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
        <div tabIndex="0" className='room-element' onClick={enterRoom} onKeyDown={handleKeyDown}>
            <span className='room-element-name'>{roomName}</span>
            <span className='room-element-count'>{viewers} watching</span>
        </div>
    );
};

export default RoomListElement;