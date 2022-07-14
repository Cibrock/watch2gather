import React from "react";
import { createUser } from "./UserController";
import { roomName } from "../Room"
import { joinRoom } from "./RoomController";
import { user } from "../App";
import "./styles/InputUser.css"

class InputUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", trigger: (props.trigger === undefined) ? false : props.trigger};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }
  handleInputChange(event) {
    //Update the shown text whilst typing
    this.setState({ name: event.target.value });
  }

  async submitInput(event) {
    //On Submit create the user and join a room if possible
    createUser(this.state.name);
    joinRoom(roomName,user)
    //Set Trigger false, make this invisible
    this.setState({ name: "", trigger: "false" });
    event.preventDefault();
  }

  render() {
    return (this.state.trigger) ? (
      <form onSubmit={this.submitInput}>
        <label htmlFor="UserName">
          Name eingeben
          </label>
          <input
            name="UserName" 
            type="name"
            id="UserName"
            value={this.state.name}
            placeholder="Nickname"
            onChange={this.handleInputChange} />
          <input type="submit" value="Submit" />
      </form>
    ) : null;
  }
}
export default InputUser