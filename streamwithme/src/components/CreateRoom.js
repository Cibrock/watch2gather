import React, { useCallback } from 'react';
import "./styles/CreateRoom.css";
import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom } from './API/RoomAPI';
import { roomState } from '../Room';
import { userState } from '../App';
import 'reactjs-popup/dist/index.css';
import { popupInputState } from './InputUser';
import { roomTitleState } from './Navbar';

// Hiermit kann ein Nutzer einen neuen Raum anlegen und beitreten

const CreateRoom = () => {
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    const instantiateRoom = async () => {
        if (userState.get() === false) {
            popupInputState.set(true);
            console.log("Blocked create room, user is not set");
        }else{
            const roomName = await createRoom();
            roomState.set(roomName);
            roomTitleState.set(roomName);
            joinRoom(roomName, userState.get());
            navigateToRoom();
        }
    };

    return (
        <div className="flex-container">
            <div className="flex-inner">
                <div>
                    <h2 className="accessibility">Einen Raum erstellen</h2>
                    <h2 role="none">enjoy with me.</h2>
                </div>
                <button type="button" onClick={instantiateRoom} id="roombutton">
                    Einen Raum Erstellen
                </button>
            </div>
        </div>
    );
};
export default CreateRoom;