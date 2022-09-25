import React, {useCallback} from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./components/styles/NotFound.css"

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
            <div className="not-found-flex"> 
                <h1 className="not-found-header">Page Not Found</h1>
                <div className="not-found-flex-row">                
                    <p className="not-found-text">Dieser Raum existiert nicht mehr. Zurück zur Startseite.</p>
                    <button className="not-found-btn" onClick={navigateToHome} aria-label="zurück zur Startseite">➔</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;