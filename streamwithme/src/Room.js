import React, { useEffect, useState } from "react";
import "./components/styles/Room.css"
import { user } from "./App";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Video from "./components/Video";
import Navbar from "./components/Navbar";
import { leaveRoom } from "./components/API/RoomAPI";
import { deleteUser } from "./components/API/UserAPI";
import Backgroundvideo from "./components/Backgroundvideo";
import Footer from "./components/Footer";
import { hookstate, useHookstate } from '@hookstate/core';


export const setRoom = hookstate(false);

const APP = 'StreamWithMe'

const Room = () => {
    const roomName = useHookstate(setRoom);

    useEffect( () => {
        // if (roomName === undefined) {
        //     let roomData = await getRooms()
        //     setRoom.set(roomData.rooms[0].name)
        // }
        const handleTabClose = event => {
            event.preventDefault();
            leaveRoom(roomName.get(), user)
            deleteUser(user)
            console.log("beforeunload");
            return (event.returnValue = 'Are you sure you want to exit?');
        };
        window.addEventListener('beforeunload', handleTabClose);

        return () => window.removeEventListener('beforeunload', handleTabClose);
    } )

    return (
        <div className="Room">
            <HelmetProvider>
                <Helmet>
                    <title>{APP + " - " + roomName.get()}</title>
                </Helmet>
                <Navbar />
                <div className="room-container">
                    <h1>{roomName.get()}</h1>
                    <Video />
                </div>
                <Backgroundvideo />
                <Footer/>
            </HelmetProvider>
        </div>
    )
}

export default Room