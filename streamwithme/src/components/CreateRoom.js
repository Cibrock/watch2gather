import React from 'react';
import "./styles/CreateRoom.css"


const CreateRoom = () => {
    return (
        <div className="flex-container">
            <div className="flex-inner">
                <div>
                    <h2 className="accessibility">Einen Raum erstellen</h2>
                    <h2 role="none">enjoy with me.</h2>
                    </div>
                <div><button id="roombutton">Einen Raum Erstellen</button></div>
            </div>
            <div className="flex-rooms">
                <div><h2>Einem Raum beitreten</h2></div>
                <div className="flex-room">

                </div>
            </div>
        </div> 
    )
}

export default CreateRoom