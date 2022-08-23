import React from "react";
import { createUser } from "./UserController";
import Room, { roomName } from "../Room"
import { getRoomUsers, joinRoom } from "./RoomController";
import { user } from "../App";

class PostUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", trigger: (props.trigger == undefined) ? false : props.trigger};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.UserInput = this.UserInput.bind(this);
    }
    handleInputChange(event) {
        //Update the shown text whilst typing
        this.setState({ name: event.target.value });
    }

    async UserInput(event) {
        //On Submit create the user and join a room if possible
        createUser(this.state.name);
        if(roomName!="Test"){
          // joinRoom(roomName,user)
        }
        //Set Trigger false, make this invisible
        this.setState({ name: "", trigger: "false" });
        event.preventDefault();
      
    }

    render() {
        return (this.state.trigger) ? (
            <form onSubmit={this.UserInput}>
                <label htmlFor="UserName">
                    Name eingeben
                </label>
                <input
                    name="UserName" 
                    type="name"
                    id="UserName"
                    value={this.state.name}
                    onChange={this.handleInputChange} />
                <input type="submit" value="Submit" />
            </form>
        ) : null;
    }
}
export default PostUser