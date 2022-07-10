import React from 'react'
import { Link } from "react-router-dom"
import { setRoomName } from '../Room';

class RoomListElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = { roomName: props.roomName};
      this.enterRoom = this.enterRoom.bind(this);
    }

    enterRoom(){
        setRoomName(this.state.roomName)
    }
  
    render() {
        return (
            <li key={this.state.roomName} onClick={this.enterRoom}>
                <Link to="/Room">
                    {this.state.roomName}
                </Link>
            </li>
        )
    }
  }

export default RoomListElement;