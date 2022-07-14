import React from 'react';
import "./styles/CreateRoom.css"
import { Link } from "react-router-dom"
import { createRoom} from './RoomController'
import { setRoomName } from '../Room';
import RoomList from './RoomList';
import Backgroundvideo from './Backgroundvideo';

const instantiateRoom = async () => {
    let name = await createRoom()
    setRoomName(name)
}


const CreateRoomUi = () => {
    return (
        <div className="flex-container">
            <div className="flex-inner">
                <div>
                    <h2 className="accessibility">Einen Raum erstellen</h2>
                    <h2 role="none">enjoy with me.</h2>
                </div>
                <div>
                    <Backgroundvideo />
                    <Link to="/Room">
                        <button type="button" onClick={instantiateRoom} id="roombutton">
                            Einen Raum Erstellen
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex-rooms">
                <div><h2>Einem Raum beitreten</h2></div>
                <div className="flex-room">
                    <RoomList/>
                </div>
            </div>
        </div>
    )
}

export default CreateRoomUi