import React from 'react';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../App.css";

export default function Footer() {
    return (
        <div className="footer">
            <div>
                <label className="Copyright">&copy; 2021 Archmetrics-Studio</label>
            </div>
            <div className="FooterIcons">
                <FontAwesomeIcon className="Icon" icon={faFacebook} />
                <FontAwesomeIcon className="Icon" icon={faTwitter} />
                <FontAwesomeIcon className="Icon" icon={faLinkedin} />
            </div>
        </div>
    );
}