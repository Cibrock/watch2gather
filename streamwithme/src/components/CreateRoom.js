import React from 'react';
import "./styles/CreateRoom.css"
const CreateRoom = () => {
    return (
        <div className="flex-container">
            <div className="flex-inner">
                <div><h1>enjoy together.</h1></div>
                <div><button id="roombutton" onclick="window.location.href = 'Raum.html';">Einen Raum Erstellen</button></div>
            </div>
            <div class="flex-rooms">
                <div><h1>Einem Raum beitreten</h1></div>
                <div class="flex-room">

                </div>
            </div>
        </div> 
    )
}

export default CreateRoom