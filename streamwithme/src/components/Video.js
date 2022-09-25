import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import "./styles/Video.css";
import { userState } from '../App';
import { getVideoUrl, changeVideoStatus, getVideoStatus, getVideoPosition, changeVideoPosition } from './API/VideoAPI';
import { roomState } from '../Room';
import { eventState } from './EventHandler';
import {useMediaQuery } from '@react-hook/media-query';
/*  
Das Video-Element enthällt den React-Player und synchronisiert sich mit der API.
Jede Sekunden werden die URL, der Status und die Position abgefragt und wenn nötig
geändert. Über matches wird der Player. responsiv gemacht. 
 */
const Video = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("paused");
    const [isPlaying, setPlaying] = useState(false);
    const [pos, setPos] = useState(0);
    const matchesWidth = useMediaQuery("only screen and (max-width:900px)");
    const matchesHeight = useMediaQuery("only screen and (max-height:400px)")

    const playerRef = useRef();
    const roomName = roomState.get();
    const user = userState.get();

    useEffect(() => {
        const interval = setInterval(async () => {
            await videoUrl();
            await videoStatus();
            await videoPosition();
        }, 1000);
        return () => clearInterval(interval);
    });

    const videoUrl = async () => {
        const dataUrl = await getVideoUrl(roomName);
        const newUrl = dataUrl.url;
        if (newUrl !== url) {
            eventState.set("NewVideo")
            setUrl(newUrl)
        };
    };

    const videoStatus = async () => {
        const dataStatus = await getVideoStatus(roomName);
        const newStatus = dataStatus.status;
        if (newStatus !== status) {
            setStatus(newStatus);
            eventState.set("Video" + (newStatus==="paused" ? "Paused" : "Unpaused"))
            if (newStatus === "paused") setPlaying(false);
            else if (newStatus === "playing") setPlaying(true);
        }
    };

    const videoPosition = async () => {
        const dataPos = await getVideoPosition(roomName);
        const newPos = dataPos.position;
        if (Math.abs(newPos - pos) > 3) {
            playerRef.current.seekTo(newPos, 'seconds');
            eventState.set("Video"+ (newPos>pos?"FFW":"REW"))
        }
        setPos(newPos);
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
                height={ matchesHeight ? '70vh' : (matchesWidth ? '25vh' :  '70vh') }
                width={  matchesHeight ? '96vw' : (matchesWidth ? '96vw' :  '70vw') }
                border='bold'
                controls
                muted
                playing={isPlaying}
                url={url}
                ref={playerRef}
                progressInterval={1000}
                onReady={setupVideo}
                onStart={() => changeVideoStatus(roomName, user, 'playing')}
                onPlay={() => changeVideoStatus(roomName, user, 'playing')}
                onPause={() => changeVideoStatus(roomName, user, 'paused')}
                onProgress={(data) => changeVideoPosition(roomName, user, data.playedSeconds)}
                onSeek={(data) => changeVideoPosition(roomName, user, data.playedSeconds) }
                onEnded={() => eventState.set("VideoEnded")}
                onError={() => eventState.set("VideoError")}
            />
            <div className='video-outline' />
        </div>
    );
};

export default Video;


