import React, { useCallback } from 'react';
import "./styles/CreateRoom.css";
import { useNavigate } from 'react-router-dom';
import { createRoom } from './API/RoomAPI';
import { setRoom } from '../Room';
import RoomList from './RoomList';
import { user } from '../App';
import 'reactjs-popup/dist/index.css';
import { setPopup } from './InputUser';

const CreateRoom = () => {
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    const instantiateRoom = async () => {
        if (user === undefined) {
            setPopup.set(true);
            return console.log("Blocked join room, user is " + user);
        }
        let name = await createRoom();
        setRoom.set(name)
        navigateToRoom();
    };

    return (
        <div className="flex-container">
            <div className="flex-inner">
                <div>
                    <h2 className="accessibility">Einen Raum erstellen</h2>
                    <h2 role="none">enjoy with me.</h2>
                </div>
                <div>
                    <button type="button" onClick={instantiateRoom} id="roombutton">
                        Einen Raum Erstellen
                    </button>
                </div>
            </div>
            <div className="flex-rooms">
                <div><h2>Einem Raum beitreten</h2></div>
                <div className="flex-room">
                    <RoomList />
                </div>
            </div>
        </div>
    );
};
export default CreateRoom;