import React, {useState} from "react";
import { userState } from "../App";
import { roomState } from "../Room";
import { changeVideoUrl } from './API/VideoAPI';

const VideoInput = () => {
    const roomName = roomState.get();
    const user = userState.get();
    const [input, setInput] = useState("");

    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setInput(event.target.value);
    };

    const urlInput = (event) => {
        //On Submit create the user and join a room if possible
        if (user === false) console.log("user is not set");
        else {
            changeVideoUrl(roomName, user, input);
            setInput("");
        }
        event.preventDefault();
    };

    return (
        <div className="VideoInput">
            <form onSubmit={urlInput}>
                <label htmlFor="Url">
                    Video URL eingeben
                </label>
                <input
                    type='text'
                    name="Url"
                    id="Url"
                    placeholder="z.B: https://youtu.be/dQw4w9WgXcQ"
                    value={input}
                    onChange={handleInputChange}
                />
                <input type="submit" className="submitVideo" value="Video Teilen" />
            </form>
        </div>
    );

};

export default VideoInput;