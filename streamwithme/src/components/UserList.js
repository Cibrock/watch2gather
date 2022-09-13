import React, { useState } from 'react';
import './styles/UserList.css';
import Async from "react-async";
import { getRoomUsers } from './API/RoomAPI';
import { roomState } from '../Room';

const UserListElement = (props) => {
    const [name] = useState(props.name);

    return (
        <li className='element'>
            {name}
        </li>
    );
};

const UserList = () => {
    const roomName = roomState.get();
    
    return (
        <Async promiseFn={async () => { return getRoomUsers(roomName); }}>
            {({ data, error, isLoading }) => {
                if (isLoading) return "Loading...";
                if (error) return 'Something went wrong: ' + error.message;
                if (data)
                    return (
                        <div className="flex-userList">
                            <div className='userList_container'>
                                <ul className='userList' aria-label="User">
                                    {data.users.map(user => (<UserListElement name={user.name} key={user.id} />))}
                                </ul>
                            </div>
                        </div>
                    );
                return null;
            }}
        </Async> 
    )
};

export default UserList;