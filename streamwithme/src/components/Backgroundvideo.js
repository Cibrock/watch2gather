import React from 'react';
import './styles/Backgroundvideo.css';
import video from './Assets/bgvid.860475ab.mp4';

// Lediglich ein Hintergrundvideo. 
// Da es sich um eine Streaming-Seite handelt, wird dieses Element auch 
// bei mobilen Nutzern angezeigt.

const Backgroundvideo = () => {
    return (
        <video id="background-video" autoPlay loop>
            <source src={video} type="video/mp4"/>
        </video>
    )
}

export default Backgroundvideo