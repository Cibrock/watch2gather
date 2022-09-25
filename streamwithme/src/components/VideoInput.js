import React, { useState } from "react";
import { userState } from "../App";
import { roomState } from "../Room";
import { changeVideoUrl } from './API/VideoAPI';
import "./styles/VideoInput.css";

// Über den Video-Input, kann der Nutzer ein Video-Link mit dem Raum teilen

const VideoInput = () => {
    const roomName = roomState.get();
    const user = userState.get();
    const [input, setInput] = useState("");
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const urlInput = (event) => {
        event.preventDefault();
        changeVideoUrl(roomName, user, input);
        setInput("");
    };

    return (
        <div className="video-input">
            <form className="video-input-form" onSubmit={urlInput}>
                <label htmlFor="Url" className="video-input-label">
                    Video URL eingeben
                </label>
                <input
                    type='text'
                    name="Url"
                    id="Url"
                    className="video-input-url"
                    placeholder="z.B: https://youtu.be/dQw4w9WgXcQ"
                    value={input}
                    onChange={handleInputChange}
                />
                <input type="submit" className="video-input-submit" value="Teilen" />
            </form>
        </div>
    );

};

export default VideoInput;