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
            //Sync url with API
            const dataUrl = await getVideoUrl(roomName);
            const newUrl = dataUrl.url;
            if (newUrl !== url) setUrl(newUrl);
            //Sync status with API
            const dataStatus = await getVideoStatus(roomName);
            const newStatus = dataStatus.status;
            if (newStatus !== status) {
                setStatus(newStatus);
                if (newStatus === "paused") setPlaying(false);
                else if (newStatus === "playing") setPlaying(true);
            }
            const dataPos = await getVideoPosition(roomName);
            const newPos = dataPos.position;
            console.log("own:",pos," api:", newPos, " dif:",Math.abs(newPos - pos));
            if (Math.abs(newPos - pos) > 3) {
                setPos(newPos);
                setPlaying(true);
                playerRef.current.seekTo(newPos, 'seconds');
            }

        }, 3000);
        return () => clearInterval(interval);
    });

    const updatePos = (data) => {
        setPos(Math.round(data.playedSeconds)); 
        changeVideoPosition(roomName, user, Math.round(data.playedSeconds));
    }

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
                    onReady={() => console.log('onReady callback')}
                    onStart={() => changeVideoStatus(roomName, user, 'playing')}
                    onPause={() => changeVideoStatus(roomName, user, 'paused')}
                    onEnded={() => console.log('onEnd callback')}
                    onError={() => console.log('onError callback')}
                    onProgress={(data) => { updatePos(data) }}
                    onSeek={(data) => { updatePos(data) }}
                    progressInterval={3000}
                    ref={playerRef}
                />
            </div>
        </div>
    );
};

//     async componentDidMount() {
//         const interval = setInterval(async () => {
//             if (roomName === "") return;
//             //Sync url with API
//             let dataUrl = await getVideoUrl(roomName);
//             let url = dataUrl.url;
//             if (url !== this.state.url) this.setState({ url: url });
//             //Sync status with API
//             let dataStatus = await getVideoStatus(roomName);
//             let status = dataStatus.status;
//             if (status !== this.state.status) {
//                 if (status === "paused")
//                     this.setState({ status: status, isPlaying: false });
//                 else if (status === "playing")
//                     this.setState({ status: status, isPlaying: true });

//             }
//             // Sync position in video with API
//             let dataPos = await getVideoPosition(roomName);
//             let pos = dataPos.position;
//             if (pos !== this.state.pos) {
//                 // // if ((typeof(pos)==="number") && (Math.abs(pos - this.state.pos) > 3)) {
//                 //     this.setState({ pos: pos })
//                 //     this.player.seekTo(pos, 'seconds');
//             }

//         }, 3000);
//         return () => clearInterval(interval);
//     }

//     ref = player => {
//         this.player = player;
//     };

export default Video;