import React from "react";
import { hookstate, useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import "./styles/EventHandler.css";
/* 
Der EventHandler zeigt innerhalb eines Raumes Benachrichtigungen an.
Er wird von anderen Klassen über den Hookstate geändert.
Er dient somit der Barrierefreiheit.
 */
export const eventState = hookstate("Empty");

const eventType = {
    UserLeave:      {color:"event-gray",message:"Ein User hat den Raum verlassen"},
    UserJoin:       {color:"event-gray",message:"Ein User ist dem Raum beigetreten"},
    NewMessage:     {color:"event-gray",message:"Neue Chat-Nachricht"},
    VideoPaused:    {color:"event-gray",message:"Das Video wurde pausiert"},
    VideoUnpaused:  {color:"event-gray",message:"Das Video wurde entpausiert"},
    VideoFFW:       {color:"event-gray",message:"Das Video wurde vorgespult"},
    VideoREW:       {color:"event-gray",message:"Das Video wurde zurückgespult"},

    VideoError:     {color:"event-red",message:"Es ist ein Fehler bei dem Video aufgetreten"},
    
    VideoEnded:     {color:"event-green",message:"Das Video ist vorbei"},
    NewVideo:       {color:"event-green",message:"Neues Video"},
    LinkCopied:     {color:"event-green",message:"✔ Link in Zwischenablage kopiert"},
    Empty:          {color:"",message:""}
}

const EventHandler = () => {
    const event = useHookstate(eventState);

    useEffect(() => {
        const timeout = setTimeout(() => { event.set("Empty") }, 3000);
        return () => clearTimeout(timeout)
    });

    return (
        <div className={ (event.get()!=="Empty" ? "event-flex-shown " + eventType[event.get()].color : "event-flex-hidden ") } aria-live="polite">
            {eventType[event.get()].message}
        </div>
    );
};

export default EventHandler;