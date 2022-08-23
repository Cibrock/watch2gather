import React from 'react';
import RoomListElement from "./RoomListElement";
import './styles/RoomList.css';
import Async from "react-async";
import { getRooms } from './API/RoomAPI';

let startIndex = 0;
let endIndex = 12;

const shownRooms = (rooms) => {
    let out = [];
    if (rooms.length === 0) return out;
    for (let i = startIndex; i < endIndex; i++) {
        if (typeof (rooms[i]) == "object")
            out[i] = rooms[i].name;
    }
    return out;
};

const RoomList = () => (
    <Async promiseFn={getRooms}>
        {({ data, error, isLoading }) => {
            if (isLoading) return "Loading...";
            if (error) return 'Something went wrong: ' + error.message;
            if (data)
                return (
                    <div className='roomlist_container'>
                        <ul className='roomlist' aria-label="Räume">
                            {shownRooms(data.rooms).map(room => (<RoomListElement name={room} key={room} />))}
                        </ul>
                    </div>
                );
            return null;
        }}
    </Async>
);

export default RoomList;