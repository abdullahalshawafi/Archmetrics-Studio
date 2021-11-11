import React from "react";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <label className="Copyright">
          &copy; 2021 Archmetrics Studio All rights reserved
        </label>
      </div>
      <div className="FooterIcons">
        <Link to="https://www.facebook.com/">
          <FontAwesomeIcon className="Icon" icon={faFacebook} />
        </Link>
        <Link to="https://www.twitter.com/">
          <FontAwesomeIcon className="Icon" icon={faTwitter} />
        </Link>
        <Link to="https://www.linkedin.com/">
          <FontAwesomeIcon className="Icon" icon={faLinkedin} />
        </Link>
      </div>
    </div>
  );
}
