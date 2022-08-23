import React from "react";
import InputUser from "./InputUser";
import "./styles/UserPopup.css"

const UserPopup = ({ open }) => {
    if (!open) return null
    return (
        <div className='overlay'>
            
            <InputUser />
            
        </div>

    )
}

export default UserPopup