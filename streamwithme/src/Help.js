import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./components/styles/Help.css"

/*
    Dies sollte ein Popup sein oder nicht?
*/
const Help = () => {
    const APP = 'StreamWithMe'

    return (
        <div className='Help'>
            <Helmet>
                <title>{APP + " - " + "Help"}</title>
            </Helmet>
            <Navbar />
            Funktionen erklärt
            <div className="footer">    <Footer /></div>
        </div>
    );
};
export default Help;