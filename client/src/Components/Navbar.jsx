import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"
import logo from "../logo.svg"
export function Navbar() {
    return <div className="navbar">
        <div className="logo">
            <img className="logoImg" src={logo} />
        </div>
        <div className="Content">
            <Link to ="/">
                <button className="ContentButton">Home</button>
            </Link>
            <Link to = "/Services">
                <button className="ContentButton">Services</button>
            </Link>
            <Link to ="Community">
                <button className="ContentButton">Community</button>
            </Link>
            <Link to = "Projects">
                <button className="ContentButton">Projects</button>
            </Link>    
        </div>
    </div>
}

