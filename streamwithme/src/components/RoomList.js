import React from 'react'
import RoomListElement from "./RoomListElement"
import './styles/RoomList.css';
import Async from "react-async";
import { getRooms} from './RoomController'

let startIndex = 0
let endIndex = 12
let maxLength

const shownRooms = (rooms) => {
    let out = []
    maxLength = rooms.length;
    if (rooms.length === 0) return
    for (let i = startIndex; i < endIndex; i++) {
        out.push(rooms[i].name)
    }
    return out;
}

const RoomList = () => (
    <Async promiseFn={getRooms}>
        {({ data, error, isLoading }) => {
            if (isLoading) return "Loading...";
            if (error) return 'Something went wrong: ${error.message}';
            if (data)
                return false ? (
                    <div className='roomlist_container'>
                    <ul className='roomlist' aria-label="Räume">
                        {shownRooms(data.rooms).map(room => (<RoomListElement roomName={room} />))}
                    </ul>
                    </div>
                ): null;
            return null;
        }}
    </Async>
);

export default RoomList