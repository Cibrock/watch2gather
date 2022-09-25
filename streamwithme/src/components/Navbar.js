import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/navbar.css";
import { hookstate, useHookstate } from '@hookstate/core';
import { leaveRoom } from './API/RoomAPI';
import { userState } from '../App';
import { getUsers } from './API/UserAPI';
import { popupHelpStatus } from './Help';
import { eventState } from './EventHandler';
/* 
Die Navbar erlaubt die Navigation zur Startseite sowie die Hilfe.
Wenn ein Nutzer erstellt wurde, ändert sich der Titel zu StreamWith+Nutzername
Hier wird auch der Raumname gezeigt, wenn man einen betritt.
Zuletzt kann man den Raumnamen clicken um einen Link zu diesem zu erhalten.
Über den Hookstate lässt sich der Raumname von anderen Elementen ändern.
 */
export const roomTitleState = hookstate("");

const Navbar = () => {
    useHookstate(roomTitleState);
    const room = roomTitleState.get();
    const [title, setTitle] = useState("Me");
    const [roomTitle] = useState(room);

    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate]);

    useEffect(() => { checkTitle(); });

    const checkTitle = async () => {
        if (userState.get()) {
            const data = await getUsers();
            const users = data.users;
            if (users === undefined) {
                setTitle("Me");
            } else {
                const u = users.find((u) => userState.get() === u.id);
                setTitle(u.name);
            }
        }
        else setTitle("Me");
    };

    const handleKeyDown = (e) => {
        if (e.target.id === "home" && e.key === "Enter") handleNavigate();
        if (e.target.id === "help" && e.key === "Enter") toggleHelp();
    };
    const handleNavigate = () => {
        if (room !== false) {
            roomTitleState.set(false);
            leaveRoom(room, userState.get());
        }
        navigateToHome();
    };

    const toggleHelp = () => { popupHelpStatus.set(true); };

    const copyLink = () => {
        navigator.clipboard.writeText("https://cibrock.github.io/watch2gather/#/" + room);
        eventState.set("✔ Link in Zwischenablage kopiert");
    };

    return (
        <div className='sum' role="navigation">
            <div className='logo home'>
                <div tabIndex="0" role="link" id="home" aria-label="HomeButton" className="logo-link" onClick={handleNavigate} onKeyDown={handleKeyDown} >
                    <div className='logo-stream'>StreamWith</div>
                    <div className='logo-title'>{title}</div>
                </div>
            </div>
            <div className='logo title'>
                <div className='logo-link' role="link" aria-label="Raum-Link erstellen" tabIndex={roomTitle ? "0" : "-1" } onClick={copyLink}>{roomTitle ? roomTitle+" 🖫" : null}</div>
            </div>
            <div className='logo help'>
                <div className="logo-link" role="link" id="help" aria-label="Hilfe öffnen" tabIndex="0" onClick={toggleHelp} onKeyDown={handleKeyDown}>Hilfe</div>
            </div>
        </div>
    );
};
export default Navbar;
