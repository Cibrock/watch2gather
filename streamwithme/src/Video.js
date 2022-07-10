import React from 'react'
import video from './components/Assets/bgvid.860475ab.mp4'
import ReactPlayer from 'react-player'
import { user } from './App'
import { changeVideoUrl, getVideoUrl, changeVideoStatus } from './components/VideoController'
import { roomName } from './Room'

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: "", url: "" };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.UrlInput = this.UrlInput.bind(this);
    }
    handleInputChange(event) {
        //Update the shown text whilst typing
        this.setState({ input: event.target.value });
    }
    async componentDidMount() {
        const interval = setInterval(async () => {
            let data = await getVideoUrl(roomName)
            let url = data.url
            if (url != this.state.url) {
                this.setState({ url: url })
                console.log(url)
            }
        }, 10000);
        return () => clearInterval(interval);
    }
    async componentDidUpdate() {
        const interval = setInterval(async () => {
            let data = await getVideoUrl(roomName)
            let url = data.url
            if (url != this.state.url) {
                this.setState({ url: url })
                console.log(url)
            }
        }, 10000);
        return () => clearInterval(interval);
    }

    async UrlInput(event) {
        //On Submit create the user and join a room if possible
        changeVideoUrl(roomName, user, this.state.url)

        //Set Trigger false, make this invisible
        this.setState({ input: "" });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.UrlInput}>
                    <label>
                        URL
                        <input
                            name="Url" type="text"
                            value={this.state.input}
                            onChange={this.handleInputChange} />
                        <input type="submit" value="Video Teilen" />
                    </label>
                </form>
                <ReactPlayer
                    url={this.state.input}
                 />
                <ReactPlayer
                    controls
                    url={this.state.url}
                    onReady={() => console.log('onReady callback')}
                    onStart={() => changeVideoStatus(roomName, user, 'playing')}
                    onPause={() => changeVideoStatus(roomName, user, 'paused')}
                    onEnded={() => console.log('onEnd callback')}
                    onError={() => console.log('onError callback')}
                />
            </div>
        )
    }
}
export default Video