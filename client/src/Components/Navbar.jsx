import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../assets/logo-white.png";
import logoBlack from "../assets/logo-black.png";
import "../App.css";

export default function Navbar({ pathname }) {
  const [isNavTop, setIsNavTop] = useState(true);

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsNavTop(window.pageYOffset > 80 ? false : true);
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

    return (
        <div className={`navbar ${isNavTop ? "navbar-transparent" : ""}`}>
            <div className="logo">
                <Link to="/">
                    <img className="logoImg" src={isNavTop ? logoWhite : logoBlack} alt="Logo" />
                </Link>
                
            </div>
            <div className="nav-links">
                <div className={`nav-link ${pathname === 'home' ? 'active' : ''}`}>
                    <Link to="/">
                        Home
                    </Link>
                </div>
                <div className={`nav-link ${pathname === 'services' ? 'active' : ''}`}>
                    <Link to="/services">
                        Services
                    </Link>
                </div>
                <div className={`nav-link ${pathname === 'projects' ? 'active' : ''}`}>
                    <Link to="/projects">
                        Projects
                    </Link>
                </div>
            </div>
      </div>
  );
}
