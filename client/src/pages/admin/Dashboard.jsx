import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate } from "react-router-dom";
import { loggedIn } from "../../services/auth";
import { getServices, deleteService } from "../../services/services";
import { getProjects, deleteProject } from "../../services/projects";

function Dashboard({ adminPage, setAdminPage }) {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setAdminPage("dashboard");
  });

  useEffect(() => {
    getServices(setServices);
    getProjects(setProjects);
  }, []);

  const handleServiceDelete = (service) => {
    if (
      window.confirm(
        "Are you sure you want to delete this service? It can't be undone"
      )
    ) {
      deleteService(services, service, setServices);
    }
  };

  const handleProjectDelete = (project) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? It can't be undone"
      )
    ) {
      deleteProject(projects, project, setProjects);
    }
  };

  return !loggedIn ? (
    <Navigate to="/admin/login" />
  ) : (
    <AdminLayout adminPage={adminPage}>
      <h1 className="mt-5 pt-5 text-center fw-bold">Dashboard</h1>
      <div className="row mx-0 p-5 pt-3">
        <div className="col-12 col-md-6">
          {services.length ? (
            <table
              className="table table-dark table-striped table-bordered table-hover align-middle mt-1 text-center"
              style={{ height: "fit-content" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Services</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/admin/edit-service/${service.slug}`}
                        className="text-light"
                      >
                        {service.title}
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-link text-decoration-none text-danger"
                        onClick={() => handleServiceDelete(service.slug)}
                      >
                        Delete{" "}
                        <FontAwesomeIcon className="ms-2" icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="text-center">There are no services</h2>
          )}
        </div>
        <div className="col-12 col-md-6">
          {projects.length ? (
            <table
              className="table table-dark table-striped table-bordered table-hover align-middle mt-1 text-center"
              style={{ height: "fit-content" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Projects</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/admin/edit-project/${project.slug}`}
                        className="text-light"
                      >
                        {project.title}
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-link text-decoration-none text-danger"
                        onClick={() => handleProjectDelete(project.slug)}
                      >
                        Delete{" "}
                        <FontAwesomeIcon className="ms-2" icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="text-center">There are no projects</h2>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;