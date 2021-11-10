import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from "../assets/logo-white.png";
import "../App.css";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <img className="logoImg" src={logoWhite} alt="Logo" />
            </div>
            <div className="Content">
                <Link to="/">
                    <button className="ContentButton">Home</button>
                </Link>
                <Link to="/services">
                    <button className="ContentButton">Services</button>
                </Link>
                <Link to="/community">
                    <button className="ContentButton">Community</button>
                </Link>
                <Link to="/projects">
                    <button className="ContentButton">Projects</button>
                </Link>
            </div>
        </div>
    );
}

