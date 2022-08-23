import React from "react";
import { createUser } from "./UserController";

const PostUser = (props) => {
    let name = "";
    let trigger = props.trigger === undefined ? false : props.trigger;

    handleInputChange = (event) => {
        //Update the shown text whilst typing
        name = event.target.value
    }

    userInput = async (event) => {
        //On Submit create the user and join a room if possible
        createUser(name);
        name = "";
        trigger = false;
        event.preventDefault();
    }

    return (trigger) ? (
        <form onSubmit={userInput}>
            <label htmlFor="UserName">
                Name eingeben
            </label>
            <input
                name="UserName" 
                type="name"
                id="UserName"
                value={name}
                onChange={handleInputChange} />
            <input type="submit" value="Submit" />
        </form>
    ) : null;

}

export default PostUser