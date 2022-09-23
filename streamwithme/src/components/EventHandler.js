import React, { useState } from "react";
import { hookstate, useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export const eventState = hookstate(false);

const EventHandler = () =>{
    const event = useHookstate(eventState);

    useEffect(()=>{
        console.log(event.get())
    })

    return(
        <div className="event-flex" aria-live="polite">
            {event.get()}
        </div>
    )
}

export default EventHandler;