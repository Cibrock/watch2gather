import React, { useEffect, useState } from 'react';
import RoomListElement from "./RoomListElement";
import './styles/RoomList.css';
import { getRooms} from './API/RoomAPI';

const RoomList = () => {
    const [displayed, setDisplayed] = useState([]);
    
    useEffect(() => {
        const interval = setInterval(async () => { await shownRooms(); }, 1000);
        return () => clearInterval(interval);
    });

    const shownRooms = async () => {
        const data = await getRooms();
        const rooms = data.rooms;
        if (rooms === undefined) return;
        setDisplayed(rooms);
    };

    return (
        <div className="flex-rooms">
            <h2 className='room-header'>Einem Raum beitreten</h2>
            <div className='room-list' aria-label="Räume">
                {displayed.map(e => (<RoomListElement name={e.name} key={e.name}/>))}
            </div>
        </div>
    );
};

export default RoomList;