import React from "react";
import { hookstate, useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import "./styles/EventHandler.css";
/* 
Der EventHandler zeigt innerhalb eines Raumes Benachrichtigungen an.
Er wird von anderen Klassen über den Hookstate geändert.
Er dient somit der Barrierefreiheit.
 */
export const eventState = hookstate("");

const EventHandler = () => {
    const event = useHookstate(eventState);

    useEffect(() => {
        const timeout = setTimeout(() => { event.set("") }, 3000);
        return () => clearTimeout(timeout)
    });

    return (
        <div className={event.get()!==""?"event-flex-shown":"event-flex-hidden"} aria-live="polite">
            {event.get()}
        </div>
    );
};

export default EventHandler;