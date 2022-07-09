import React from "react";
import {createUser} from "./UserController";

class PostUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.UserInput = this.UserInput.bind(this);
    }
    handleInputChange(event) {
        this.setState({name: event.target.value});
        }

     UserInput(event) {
        createUser(this.state.name);
        this.setState({name: ""});
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.UserInput}>
          <label>
            Name
            <input
              name="UserName"  type="name"
              value={this.state.name}
              onChange={this.handleInputChange} />
              <input type="submit" value="Submit" />
          </label>
        </form>
      );
    }
  }
export default PostUser