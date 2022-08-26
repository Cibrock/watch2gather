import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import "./styles/Video.css";
import { user } from '../App';
import { changeVideoUrl, getVideoUrl, changeVideoStatus, getVideoStatus, getVideoPosition, changeVideoPosition } from './API/VideoAPI';
import { setRoom } from '../Room';

const Video = () => {
    const [input, setInput] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("paused");
    const [isPlaying, setPlaying] = useState(false);
    const [pos, setPos] = useState(0);

    const playerRef = useRef(null);
    const roomName = setRoom.get();

    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setInput(event.target.value);
        setPlaying(false);
    };

    const urlInput = (event) => {
        //On Submit create the user and join a room if possible
        if (user !== undefined) {
            changeVideoUrl(roomName, user, input);
            setUrl(input);
            setInput("");
        } else console.log("user is " + user);
        event.preventDefault();
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            await videoUrl();
            await videoPosition();
            await videoStatus();
        }, 3000);
        return () => clearInterval(interval);
    });

    const videoUrl = async () => {
        const dataUrl = await getVideoUrl(roomName);
        const newUrl = dataUrl.url;
        if (newUrl !== url)
            setUrl(newUrl);
    };

    const videoStatus = async () => {
        const dataStatus = await getVideoStatus(roomName);
        const newStatus = dataStatus.status;
        if (newStatus !== status) {
            setStatus(newStatus);
            if (newStatus === "paused") setPlaying(false);
            else if (newStatus === "playing") setPlaying(true);
        }
    };

    const videoPosition = async () => {
        const dataPos = await getVideoPosition(roomName);
        const newPos = dataPos.position;
        console.log("own:", pos, " api:", newPos, " dif:", Math.abs(newPos - pos));
        if (Math.abs(newPos - pos) > 3) {
            setPos(newPos);
            // setPlaying(true);
            playerRef.current.seekTo(newPos, 'seconds');
        }
    };

    const setupVideo = async () => {
        const dataPos = await getVideoPosition(roomName);
        const newPos = dataPos.position;
        setPos(newPos);
        playerRef.current.seekTo(newPos, 'seconds');
    };

    const updatePos = (data) => {
        setPos(Math.round(data.playedSeconds));
        changeVideoPosition(roomName, user, Math.round(data.playedSeconds));
    };

    return (
        <div className="video-container">
            <div className="video-input">
                <form onSubmit={urlInput}>
                    <label htmlFor="Url">
                        Video URL eingeben
                        <input
                            type='text'
                            name="Url"
                            id="Url"
                            placeholder="z.B: https://youtu.be/dQw4w9WgXcQ"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div role='presentation'>
                        <ReactPlayer
                            height='9em'
                            width='18em'
                            poster={input}
                            url={input}
                        />
                    </div>
                    <input type="submit" className="submitVideo" value="Video Teilen" />
                </form>
            </div>
            <div className="video">
                <ReactPlayer
                    height='20em'
                    width='35em'
                    border='bold'
                    controls
                    playing={isPlaying}
                    url={url}
                    ref={playerRef}
                    progressInterval={3000}
                    onReady={setupVideo}
                    onStart={() => changeVideoStatus(roomName, user, 'playing')}
                    onPause={() => changeVideoStatus(roomName, user, 'paused')}
                    onProgress={(data) => { changeVideoPosition(roomName, user, Math.round(data.playedSeconds)); }}
                    onSeek={(data) => { changeVideoPosition(roomName, user, Math.round(data.playedSeconds)); }}
                    onEnded={() => console.log('onEnd callback')}
                    onError={() => console.log('onError callback')}
                />
            </div>
        </div>
    );
};

export default Video;


