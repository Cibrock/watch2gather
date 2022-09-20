import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/styles/App.css';
import Navbar, { roomTitleState } from './components/Navbar';
import CreateRoom from './components/CreateRoom';
import { Helmet } from 'react-helmet';
import { deleteUser } from './components/API/UserAPI';
import Footer from './components/Footer';
import InputUser, { popupInputState } from './components/InputUser.js';
import Backgroundvideo from './components/Backgroundvideo';
import RoomList from './components/RoomList';
import { getRooms, leaveRoom } from './components/API/RoomAPI';
import { roomState } from './Room';
import { hookstate, useHookstate } from '@hookstate/core';
import { useLocation } from 'react-router-dom';
import Help from './components/Help';

export const userState = hookstate(false)

const App = () => {
    const user = useHookstate(userState);
    
    const location = useLocation();
    const path = location.pathname.substring(1)
    const navigate = useNavigate();
    const navigateToNotFound = useCallback(() => navigate("/NotFound", { replace: true }), [navigate]);

    useEffect(() => {
        checkRoom();
        //Delete the current user when the side is closed
        const handleTabClose = event => {
            event.preventDefault();
            if (roomState.get() !== false) leaveRoom(roomState.get(), user); //Artefakt, sollte niemals möglich sein
            console.log('beforeunload event triggered');
            deleteUser(user);
            return (event.returnValue = 'Are you sure you want to exit?');
        };

        window.addEventListener('beforeunload', handleTabClose);

        return () => window.removeEventListener('beforeunload', handleTabClose);
    }, []);

    const checkRoom = async () => {
        const data = await getRooms();
        const rooms = data.rooms;
        if (rooms === undefined) return;
        if (path === "") return;
        const target = rooms.find((room)=>{return room.name===path});
        if (target===undefined) return navigateToNotFound();
        roomState.set(path);
        roomTitleState.set(path);
        popupInputState.set(true);
        console.log("Blocked join room, user is not set");
    }

    return (
        <div className="App">
            <Helmet>
                <title>StreamWithMe</title>
            </Helmet>
            <Navbar />
            <CreateRoom />
            <RoomList />
            <Footer />
            <InputUser />
            <Backgroundvideo />
            <Help/>
        </div>
    );
};

export default App;