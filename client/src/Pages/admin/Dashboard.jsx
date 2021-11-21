import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { loggedIn, logout } from "./services/authServices";

function Dashboard({ setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false);
  });

  const handleLogout = () => {
    logout();

    window.location.reload();
  };

  const services = [
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
    {
      title: "Service",
      slug: "service",
    },
  ];

  const projects = [
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
    {
      title: "Project",
      slug: "project",
    },
  ];

  return !loggedIn ? (
    <Navigate to="/admin/login" />
  ) : (
    <div>
      <button
        onClick={handleLogout}
        className="btn btn-warning"
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
        }}
      >
        Log Out
      </button>
      <h1 className="pt-5 text-center fw-bold">Dashboard</h1>
      <div className="d-flex justify-content-between p-5 pt-1">
        <table className="table table-dark table-striped table-bordered table-hover m-5 mt-1 text-center">
          <thead>
            <tr>
              <th className="text-start">#</th>
              <th>Services</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td className="text-start">{index + 1}</td>
                <td>
                  <Link to={`/services/${service.slug}`} className="text-light">
                    {service.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table
          className="table table-dark table-striped table-bordered table-hover m-5 mt-1 text-center"
          style={{ height: "fit-content" }}
        >
          <thead>
            <tr>
              <th className="text-start">#</th>
              <th>Projects</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="text-start">{index + 1}</td>
                <td>
                  <Link to={`/projects/${project.slug}`} className="text-light">
                    {project.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
