import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"

export function Navbar() {
    return <div>
        <div className="Content">
            <Link to ="/">
                <button className="ContentButton">Home</button>
            </Link>
            <Link to = "/Services">
                <button>Services</button>
            </Link>
            <Link to ="Community">
                <button>Community</button>
            </Link>
            <Link to = "Projects">
                <button>Projects</button>
            </Link>    
        </div>
    </div>
}

