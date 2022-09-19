import React, { useState, useEffect} from 'react';
import './styles/UserList.css';
import { getRoomUsers } from './API/RoomAPI';
import { roomState } from '../Room';

const UserListElement = (props) => {
    const [name] = useState(props.name);
    return (
        <li className='user-element'>
            {name}
        </li>
    );
};

const UserList = () => {
    const roomName = roomState.get();
    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        const interval = setInterval( async () => { await shownUsers(); }, 3000);
        return () => clearInterval(interval);
    });

    const shownUsers = async () => {
        const data = await getRoomUsers(roomName);
        const users = data.users;
        if (users === undefined) return;
        setDisplayed(users);
    };

    return (
        <div className="flex-user-list">
            <h2 className='user-list'>Users</h2>
            <ul className='user-list' aria-label="User">
                {displayed.map(user => (<UserListElement name={user.name} key={user.id} />))}
            </ul>
        </div>
    );
};

export default UserList;