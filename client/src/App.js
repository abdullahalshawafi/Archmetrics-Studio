import React, { useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminService = lazy(() => import("./pages/admin/AdminService"));
const AdminProject = lazy(() => import("./pages/admin/AdminProject"));

function App() {
  const [pathname, setPathname] = useState("");
  const [adminPage, setAdminPage] = useState("dashboard");

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route
            path="/"
            element={<Home pathname={pathname} setPathname={setPathname} />}
          />
          <Route
            path="/services"
            element={<Services pathname={pathname} setPathname={setPathname} />}
          />
          <Route
            path="/services/:service"
            element={
              <ServiceDetails pathname={pathname} setPathname={setPathname} />
            }
          />
          <Route
            path="/projects"
            element={<Projects pathname={pathname} setPathname={setPathname} />}
          />
          <Route
            path="/projects/:project"
            element={
              <ProjectDetails pathname={pathname} setPathname={setPathname} />
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <Dashboard adminPage={adminPage} setAdminPage={setAdminPage} />
            }
          />
          <Route
            path="/admin/add-service"
            element={
              <AdminService adminPage={adminPage} setAdminPage={setAdminPage} />
            }
          />
          <Route
            path="/admin/add-project"
            element={
              <AdminProject adminPage={adminPage} setAdminPage={setAdminPage} />
            }
          />
          <Route
            path="/admin/edit-service/:service"
            element={
              <AdminService adminPage={adminPage} setAdminPage={setAdminPage} />
            }
          />
          <Route
            path="/admin/edit-project/:project"
            element={
              <AdminProject adminPage={adminPage} setAdminPage={setAdminPage} />
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
