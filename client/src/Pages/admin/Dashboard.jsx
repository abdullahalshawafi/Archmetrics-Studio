import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link, Navigate } from "react-router-dom";
import { loggedIn } from "./services/authServices";

function Dashboard() {
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
    <AdminLayout>
      <h1 className="mt-5 pt-5 text-center fw-bold">Dashboard</h1>
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
    </AdminLayout>
  );
}

export default Dashboard;
