import React, { useEffect } from 'react';
import './components/styles/App.css';
import Navbar from './components/Navbar';
import CreateRoom from './components/CreateRoom';
import { Helmet } from 'react-helmet';
import { deleteUser } from './components/API/UserAPI';
import Footer from './components/Footer';
import InputUser from './components/InputUser.js';
import Backgroundvideo from './components/Backgroundvideo';
import RoomList from './components/RoomList';
import { leaveRoom } from './components/API/RoomAPI';
import { roomState } from './Room';
import { hookstate, useHookstate } from '@hookstate/core';

const TITLE = 'StreamWithMe';
export const userState = hookstate(false)

const App = () => {
    const user = useHookstate(userState);
    useEffect(() => {
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

    return (
        <div className="App">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className='header'>    <Navbar /></div>
            <div className='create'>    <CreateRoom /></div>
            <div className='join'>      <RoomList /></div>
            <div className='footer'>    <Footer /></div>
            <InputUser />
            <Backgroundvideo />
        </div>
    );
};

export default App;