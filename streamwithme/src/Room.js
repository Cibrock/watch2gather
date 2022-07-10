import React, { useState, useEffect } from "react";
import PostUser from "./components/PostUser";
import { user } from "./App";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Video from "./Video";
import Navbar from "./components/Navbar";
import { leaveRoom } from "./components/RoomController";
import { deleteUser } from "./components/UserController";

export let roomName = "Test"
export const setRoomName = (name) => {
    roomName = name
}
class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userState: user==undefined};
    }
    componentDidMount() {
                //remove the user from the room if they leave the side
                const handleTabClose = event => {
                    event.preventDefault();
        
                    console.log('beforeunload event triggered');
                    leaveRoom(roomName, user)
                    deleteUser(user)
                    return (event.returnValue = 'Are you sure you want to exit?');
                };
        
                window.addEventListener('beforeunload', handleTabClose);
        
                return () => {
                    window.removeEventListener('beforeunload', handleTabClose);
                };
      }
    componentDidUpdate() {
                //remove the user from the room if they leave the side
                const handleTabClose = event => {
                    event.preventDefault();
        
                    console.log('beforeunload event triggered');
                    leaveRoom(roomName, user)
                    deleteUser(user)
                    return (event.returnValue = 'Are you sure you want to exit?');
                };
        
                window.addEventListener('beforeunload', handleTabClose);
        
                return () => {
                    window.removeEventListener('beforeunload', handleTabClose);
                };
      }

    render() {
        return (
            <HelmetProvider>
                <div>
                    <Helmet>
                        <title>{roomName}</title>
                    </Helmet>
                    <div>
                        <Navbar />
                    </div>
                    <h1>{roomName}</h1>
                    <div>
                        {/* Only show this if the user is not set  */}
                        <PostUser trigger={this.state.userState} />
                    </div>
                    <div>
                        <Video />
                    </div>
                </div>
            </HelmetProvider>
        )
    }
    customForceUpdate(){
        this.forceUpdate()
    }
}

export default Room