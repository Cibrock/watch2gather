import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./components/styles/NotFound.css";
import Help from "./components/Help";

const NotFound = () => {
    const TITLE = "StreamWithMe - Room not found";

    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate("/", { replace: true }), [navigate]);
    return (
        <div className="App">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <Navbar />
            <div className="not-found-container">
                <div className="monkey">🦧</div>
                <div className="not-found-flex">
                    <h1 className="not-found-header">Error: Page Not Found</h1>
                    <h2>Dieser Raum existiert nicht.</h2>
                    <p>Auf der Startseite können neue Räume erstellt werden und bestehnden Räumen beigetreten werden.</p>
                    <button className="not-found-btn" onClick={navigateToHome}> Zurück zur Startseite ➔</button>
                </div>
            </div>
            <Footer />
            <Help />
        </div>
    );
};

export default NotFound;