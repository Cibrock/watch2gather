import React from 'react';
import "./styles/CreateRoom.css"


const CreateRoom = () => {
    return (
        <div className="flex-container">
            <div className="flex-inner">
                <div>
                    <h2 class="accessibility">Einen Raum erstellen</h2>
                    <h2 role="none">enjoy with me.</h2>
                    </div>
                <div><button id="roombutton" onclick="window.location.href = 'Raum.html';">Einen Raum Erstellen</button></div>
            </div>
            <div class="flex-rooms">
                <div><h2>Einem Raum beitreten</h2></div>
                <div class="flex-room">

                </div>
            </div>
        </div> 
    )
}

export default CreateRoom