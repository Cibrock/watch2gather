import React, { useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import "./components/styles/Room.css";
import { user } from "./App";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Video from "./components/Video";
import Navbar, { titleState } from "./components/Navbar";
import { leaveRoom } from "./components/API/RoomAPI";
import { deleteUser } from "./components/API/UserAPI";
import Footer from "./components/Footer";
import { hookstate, useHookstate } from '@hookstate/core';
import Chat from "./components/Chat";
import UserList from "./components/UserList";

export const roomState = hookstate(false);

const Room = () => {
    const APP = 'StreamWithMe';
    const roomName = useHookstate(roomState);
    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate]);

    useEffect(() => {
        if (roomName.get() === false) {
            navigateToHome();
        }
        const handleTabClose = event => {
            event.preventDefault();
            titleState.set("")
            leaveRoom(roomName.get(), user);
            deleteUser(user);
            console.log("beforeunload");
            return (event.returnValue = 'Are you sure you want to exit?');
        };
        window.addEventListener('beforeunload', handleTabClose);

        return () => window.removeEventListener('beforeunload', handleTabClose);
    });

    return (
        <div className="Room">
            <HelmetProvider>
                <Helmet>
                    <title>{APP + " - " + roomName.get()}</title>
                </Helmet>
                <div className="header">    <Navbar /></div>
                <div className="video">     <div><Video /></div></div>
                <div className="chat">      <h2>Chat</h2><Chat /></div>
                <div className="users">     <h2>Users</h2><UserList /></div>
                <div className="footer">    <Footer /></div>
            </HelmetProvider>
        </div>
    );
};

export default Room;