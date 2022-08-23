import React, { useCallback, useState } from 'react';
import "./styles/CreateRoom.css"
import { useNavigate } from 'react-router-dom';
import { createRoom } from './API/RoomAPI'
import { setRoomName } from '../Room';
import RoomList from './RoomList';
import Backgroundvideo from './Backgroundvideo';
import { user } from '../App';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputUser from './InputUser.js';
import UserPopup from './UserPopup';
import { hookstate, useHookstate } from '@hookstate/core';
import {openPopup} from './InputUser'

let condition;

const CreateRoom = () => {
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    const instantiateRoom = async () => {
        if (user === undefined) {
            condition = true
            console.log("Blocked join room");
            openPopup.set(true)
            return
        }
        let name = await createRoom();
        setRoomName(name);
        navigateToRoom();
    };

    return (
        <div className="flex-container">
                        <InputUser trigger={user!==null} open={openPopup}/>
            <div className="flex-inner">

                <div>
                    <h2 className="accessibility">Einen Raum erstellen</h2>
                    <h2 role="none">enjoy with me.</h2>
                </div>
                <div>
                    <Backgroundvideo />
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