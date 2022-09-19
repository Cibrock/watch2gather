import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import "./styles/Video.css";
import { userState } from '../App';
import { getVideoUrl, changeVideoStatus, getVideoStatus, getVideoPosition, changeVideoPosition } from './API/VideoAPI';
import { roomState } from '../Room';

const Video = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("paused");
    const [isPlaying, setPlaying] = useState(false);
    const [pos, setPos] = useState(0);

    const playerRef = useRef(null);
    const roomName = roomState.get();
    const user = userState.get();

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
        if (newUrl !== url) setUrl(newUrl);
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
        if (Math.abs(newPos - pos) > 3) {
            setPos(newPos);
            playerRef.current.seekTo(newPos, 'seconds');
        }
    };

    const setupVideo = async () => {
        const dataPos = await getVideoPosition(roomName);
        const newPos = dataPos.position;
        setPos(newPos);
        playerRef.current.seekTo(newPos, 'seconds');
        changeVideoStatus(roomName, user, "paused");
    };

    return (
        <div className="video-container">
            <ReactPlayer
                height='72vh'
                width='75vw'
                border='bold'
                controls
                muted
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
    );
};

export default Video;


