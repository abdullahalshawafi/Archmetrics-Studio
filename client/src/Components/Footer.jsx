import React from 'react';
import "../App.css"
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer(){
    return <div>
        <div>
            <label><FontAwesomeIcon icon={faCopyright} size="lg"/>&nbsp; 2021 Archmetrics-Studio</label>
        </div>
        <div className="FooterIcons">
            <FontAwesomeIcon icon={faFacebook} /> 
            <FontAwesomeIcon icon={faTwitter} /> 
            <FontAwesomeIcon icon={faLinkedin} /> 
        </div>
    </div>
}