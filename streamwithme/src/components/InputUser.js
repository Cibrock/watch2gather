import React from "react";
import { createUser } from "./API/UserAPI";
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
        createUser(this.state.name);
            //Set Trigger false, make this invisible
            this.setState({ name: "", trigger: "false" });
            event.preventDefault();
        }

    render() {
        return (true) ? (
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