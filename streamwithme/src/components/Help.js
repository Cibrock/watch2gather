import React, { useState } from 'react';
import "./styles/Help.css";
import { hookstate, useHookstate } from '@hookstate/core';

export const popupHelpStatus = hookstate(false)
const Help = () => {
    const status = useHookstate(popupHelpStatus);

    const toggle = () => { status.set(!status)}
    
    return (status.get()) && (
        <div className="modal">
            <div className="overlay" onClick={toggle}></div>
            <div className="modal-help-content">
                <button className = "modal-btn" onClick={toggle}>×</button>
                <h2>Funktionen erklärt</h2>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                 et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                  Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                   amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                     no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
                      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                       At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet.   

                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu
                 feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
                  delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
            </div>
        </div>
    );
};
export default Help;