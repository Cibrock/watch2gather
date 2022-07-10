import React from 'react'
import RoomListElement from "./RoomListElement"
import Async from "react-async";
import { getRooms} from './RoomController'

let startIndex = 0
let endIndex = 10
let maxLength

const shownRooms = (rooms) => {
    let out = []
    maxLength = rooms.length;
    for (let i = startIndex; i < endIndex; i++) {
        out.push(rooms[i].name)
    }
    return out;
}

const RoomList = () => (
    <Async promiseFn={getRooms}>
        {({ data, error, isLoading }) => {
            if (isLoading) return "Loading...";
            if (error) return `Something went wrong: ${error.message}`;
            if (data)
                return (
                    <div>
                    <ul>
                        {shownRooms(data.rooms).map(room => (
                            <RoomListElement roomName={room} />
                            ))}
                    </ul>
                    </div>
                );
            return null;
        }}
    </Async>
);

export default RoomList