import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const NotFound = () => {
    const TITLE = "Room not found"

    return(
        <div className="App">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <Navbar />
            <div>Dieser Raum existiert nicht mehr. Zurück zur Startseite ></div>
            <Footer />
        </div>
    )
}

export default NotFound;