import React from 'react';
import RoomListElement from "./RoomListElement";
import './styles/RoomList.css';
import Async from "react-async";
import { getRooms } from './API/RoomAPI';


const RoomList = () => {
    const startIndex = 0;
    const endIndex = 35;

    const shownRooms = (rooms) => {
        const out = [];
        if (rooms.length === 0) return out;
        for (let i = startIndex; i < endIndex; i++) {
            if (typeof (rooms[i]) == "object")
                out[i] = rooms[i].name;
        }
        return out;
    };

    return (
        <Async promiseFn={getRooms}>
            {({ data, error, isLoading }) => {
                if (isLoading) return "Loading...";
                if (error) return 'Something went wrong: ' + error.message;
                if (data)
                    return (
                        <div className="flex-rooms">
                            <div><h2>Einem Raum beitreten</h2></div>
                            <div className="flex-room">
                                <div className='roomlist_container'>
                                    <ul className='roomlist' aria-label="Räume">
                                        {shownRooms(data.rooms).map(room => (<RoomListElement name={room} key={room} />))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                return null;
            }}
        </Async>
    )
};

export default RoomList;