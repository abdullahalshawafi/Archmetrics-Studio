import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  faAngleRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoBlack from "../assets/logo-black.png";
import "../App.css";
import { useAuthContext } from "../helpers/AuthContext";
export default function NavbarMobile({isNavHidden }) {
  const { pathname } = useAuthContext();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div
      className={`NavbarMobile ${isNavHidden ? "navbar-hidden" : ""}`}
      id="navbar"
    >
      <div className="LogoMobile">
        <Link to="/">
          <img className="logoImgMobile" src={logoBlack} alt="Logo" />
        </Link>
      </div>
      <div className="ScrollMobile">
        {!click ? (
          <FontAwesomeIcon
            className="IconMobile"
            icon={faBars}
            onClick={handleClick}
          />
        ) : (
          <FontAwesomeIcon
            className="IconMobile"
            icon={faTimes}
            onClick={closeMobileMenu}
          />
        )}
      </div>
      <div className={click ? "nav-options active" : "nav-options"}>
        <div
          className={`nav-link-mobile ${pathname === "home" ? "active" : ""}`}
        >
          <Link to="/">
            <span className="mobile">Home</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
        <div
          className={`nav-link-mobile ${
            pathname === "services" ? "active" : ""
          }`}
        >
          <Link to="/services">
            <span className="mobile">Services</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
        <div
          className={`nav-link-mobile ${
            pathname === "projects" ? "active" : ""
          }`}
        >
          <Link to="/projects">
            <span className="mobile">Projects</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
      </div>
      <div className="mobile-menu" onClick={handleClick}></div>
    </div>
  );
}
