import React from 'react'
import ReactPlayer from 'react-player'
import "./styles/Video.css"
import { user } from '../App'
import { changeVideoUrl, getVideoUrl, changeVideoStatus, getVideoStatus, getVideoPosition, changeVideoPosition } from './API/VideoAPI'
import { roomName } from '../Room'

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: "", url: "", status: "paused", isPlaying: false, pos: 0 };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.UrlInput = this.UrlInput.bind(this);
    }
    handleInputChange(event) {
        //Update the shown text whilst typing
        this.setState({ input: event.target.value, playing: false });
    }
    async componentDidMount() {
        const interval = setInterval(async () => {
            if (roomName === "") return;
            //Sync url with API
            let dataUrl = await getVideoUrl(roomName)
            let url = dataUrl.url
            if (url !== this.state.url) this.setState({ url: url });
            //Sync status with API
            let dataStatus = await getVideoStatus(roomName)
            let status = dataStatus.status
            if (status !== this.state.status) {
                if (status === "paused") 
                    this.setState({ status: status, isPlaying: false });
                else if (status === "playing")
                    this.setState({ status: status, isPlaying: true });
                
            }
            // Sync position in video with API
            let dataPos = await getVideoPosition(roomName)
            let pos = dataPos.position
            if (pos !==this.state.pos) {
            // // if ((typeof(pos)==="number") && (Math.abs(pos - this.state.pos) > 3)) {
            //     this.setState({ pos: pos })
            //     this.player.seekTo(pos, 'seconds');
            }

        }, 3000);
        return () => clearInterval(interval);
    }

    async UrlInput(event) {
        //On Submit create the user and join a room if possible
        if (user !== undefined) {
            changeVideoUrl(roomName, user, this.state.input)
            this.setState({ input: "", url: this.state.input });
        }
        event.preventDefault();
    }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            <div className="video-container">
                <div className="video-input">
                    <form onSubmit={this.UrlInput}>
                        <label htmlFor="Url">
                            Video URL eingeben
                            <input
                                type='text'
                                name="Url"
                                id="Url"
                                placeholder="z.B: https://youtu.be/dQw4w9WgXcQ"
                                value={this.state.input}
                                onChange={this.handleInputChange} />
                                
                        </label>
                        <div role='presentation'>
                            <ReactPlayer
                                height='9em'
                                width='18em'
                                poster={this.state.input}
                                url={this.state.input}
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
                        playing={this.state.isPlaying}
                        url={this.state.url}
                        onReady={() => console.log('onReady callback')}
                        onStart={() => changeVideoStatus(roomName, user, 'playing')}
                        onPause={() => changeVideoStatus(roomName, user, 'paused')}
                        onEnded={() => console.log('onEnd callback')}
                        onError={() => console.log('onError callback')}
                        onProgress={(data) => changeVideoPosition(roomName, user, Math.round(data.playedSeconds))}
                        progressInterval={3000}
                    />
                </div>
            </div>
        )
    }
}
export default Video