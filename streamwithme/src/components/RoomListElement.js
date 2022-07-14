import React from 'react'
import "./styles/RoomListElement.css";
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
            <li className='listelement' key={this.state.roomName} onClick={this.enterRoom}>
                <Link className='element' to="/Room">
                    {this.state.roomName}
                </Link>
            </li>
        )
    }
  }

export default RoomListElement;