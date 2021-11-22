import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../pages/admin/services/authServices";

function Navbar({ adminPage }) {
  const navList = useRef(null);

  const handleLogout = () => {
    logout();

    window.location.reload();
  };

  useEffect(() => {
    navList.current.style.setProperty("--bs-scroll-height", "100px");
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin/dashboard">
            Admin Area
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              ref={navList}
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            >
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    adminPage === "dashboard" && "active"
                  }`}
                  aria-current="page"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${adminPage === "services" && "active"}`}
                  to="/admin/add-service"
                >
                  Add Service
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${adminPage === "projects" && "active"}`}
                  to="/admin/add-project"
                >
                  Add Project
                </Link>
              </li>
            </ul>
            <button
              className="btn btn-outline-warning"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
