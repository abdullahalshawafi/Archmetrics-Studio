import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {faBars,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoBlack from "../assets/logo-black.png";
import "../App.css";

export default function NavbarMobile({ pathname }) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    return (
        <div className="NavbarMobile">
            <div className="LogoMobile">
                <Link to="/">
                    <img className="logoImgMobile" src={logoBlack} alt="Logo" />
                </Link>
            </div>
            <div className="ScrollMobile">
                {!click?<FontAwesomeIcon className="IconMobile" icon={faBars} onClick={handleClick} />:
                        <FontAwesomeIcon  className="IconMobile" icon={faTimes} onClick={closeMobileMenu} />
                }
            </div>
            <div className={ click ? "nav-options active" : "nav-options"} >
                <div className={`nav-link-mobile`}>
                    <Link to="/">
                        <label className={`mobile ${pathname === 'home' ? 'active' : ''} `}> Home </label>
                    </Link>
                </div>
                <div className={`nav-link-mobile`}>
                    <Link to="/services">
                        <label className={`mobile ${pathname === 'services' ? 'active' : ''} `}> Services </label>
                    </Link>
                </div>
                <div className={`nav-link-mobile`}>
                    <Link to="/projects">
                        <label className={`mobile ${pathname === 'projects' ? 'active' : ''} `}> Projects </label>
                    </Link>
                </div>
                
            </div>
            <div className="mobile-menu" onClick={handleClick}>
            
      </div>
        </div>
    );
}