import React from "react";
import "./components/styles/Room.css"
import { user } from "./App";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Video from "./components/Video";
import Navbar from "./components/Navbar";
import { getRooms, leaveRoom } from "./components/API/RoomAPI";
import { deleteUser } from "./components/API/UserAPI";
import Backgroundvideo from "./components/Backgroundvideo";
import Footer from "./components/Footer";

const TITLE = 'StreamWithMe'

export let roomName = ""
export const setRoomName = (name) => {
    roomName = name
}
class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userState: user === undefined, title: TITLE + " - " + roomName };
    }

    async componentDidMount() {
        //Set the default roomName
        if (roomName === undefined) {
            let roomData = await getRooms()
            roomName = roomData.rooms[0].name
            this.setState({ title: TITLE + " - " + roomName })
        }

        //remove the user from the room if they leave the side
        const handleTabClose = event => {
            event.preventDefault();
            leaveRoom(roomName, user)
            deleteUser(user)
            console.log("beforeunload");
            return (event.returnValue = 'Are you sure you want to exit?');
        };
        window.addEventListener('beforeunload', handleTabClose);

        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
    }

    render() {
        return (
            <div className="Room">
                <HelmetProvider>
                    <Helmet>
                        <title>{this.state.title}</title>
                    </Helmet>
                    <Navbar />
                    <div className="room-container">
                        <h1>{roomName}</h1>
                        <Video />
                    </div>
                    <Backgroundvideo />
                </HelmetProvider>
                <Footer />
            </div>
        )
    }
    customForceUpdate() {
        this.forceUpdate()
    }
}

export default Room