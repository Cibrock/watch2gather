import React from 'react';
import "./styles/Backgroundvideo.css"
import video from '../Assets/bgvid.mp4';

const Backgroundvideo = () => {
    return (
        <video id="background-video" autoPlay loop muted>
        <source src={video} type="video/mp4"/>
        </video>
    )
}

export default Backgroundvideo