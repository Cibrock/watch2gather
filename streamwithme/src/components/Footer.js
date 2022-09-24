import React from 'react'
import "./styles/Footer.css"

// Ein einfacher Footer mit den geforderten Informationen.

const Footer = () => {
    return (
        <div className='footer-container'>
            <p className='footer-p'>Erstellt von:              Jannis Salzmann & Viktor Graf von Westarp</p>
            <p className='footer-p'>Unter Aufsicht von:  Toni Barth</p>
            <p className='footer-p footer-right'>Als Projekt:               "Watch2gether" der HS Anhalt</p>
        </div>
    );
}

export default Footer;