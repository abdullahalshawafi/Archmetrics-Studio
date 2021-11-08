import React from 'react';
import "../App.css"
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer(){
    return <div className="footer">
        <div>
            <label className="Copyright"><FontAwesomeIcon icon={faCopyright} size="lg"/>&nbsp; 2021 Archmetrics-Studio</label>
        </div>
        <div className="FooterIcons">
            <FontAwesomeIcon className="Icon" icon={faFacebook} /> 
            <FontAwesomeIcon className="Icon" icon={faTwitter} /> 
            <FontAwesomeIcon className="Icon" icon={faLinkedin} /> 
        </div>
    </div>
}