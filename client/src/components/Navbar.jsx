import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/logo-white.png';
import logoBlack from '../assets/logo-black.png';
import '../App.css';
import { useMainContext } from '../contexts/MainContext';
export default function Navbar({ isNavHidden }) {
  const { pathname } = useMainContext();
  const [isNavTop, setIsNavTop] = useState(true);

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsNavTop(window.pageYOffset > 150 ? false : true);
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <div
      id="navbar"
      className={`navbar ${isNavTop ? 'navbar-transparent' : ''} ${
        isNavHidden ? 'navbar-hidden' : ''
      }`}
    >
      <div className="logo">
        <Link to="/">
          <img
            className="logoImg"
            src={isNavTop ? logoWhite : logoBlack}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="nav-links">
        <div className={`nav-link ${pathname === 'home' ? 'active' : ''}`}>
          <Link to="/">Home</Link>
        </div>
        <div className={`nav-link ${pathname === 'services' ? 'active' : ''}`}>
          <Link to="/services">Services</Link>
        </div>
        <div className={`nav-link ${pathname === 'projects' ? 'active' : ''}`}>
          <Link to="/projects">Projects</Link>
        </div>
      </div>
    </div>
  );
}
