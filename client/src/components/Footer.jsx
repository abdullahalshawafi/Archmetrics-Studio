import React from "react";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <label className="Copyright">
          &copy; {new Date().getFullYear()} Archmetrics Studio All rights
          reserved
        </label>
      </div>
      <div className="FooterIcons">
        <a
          href="https://www.facebook.com/AMC.Archmetrics.Studio"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon className="Icon" icon={faFacebook} />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon className="Icon" icon={faTwitter} />
        </a>
        <a
          href="https://www.linkedin.com/company/archmetrics-amc/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon className="Icon" icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
}
