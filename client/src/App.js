import React, { Suspense, lazy } from "react";
import { AuthProvider } from "./helpers/AuthContext";
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
  
  return (
    <AuthProvider>
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/services"
            element={<Services/>}
          />
          <Route
            path="/services/:service"
            element={
              <ServiceDetails/>
            }
          />
          <Route
            path="/projects"
            element={<Projects/>}
          />
          <Route
            path="/projects/:project"
            element={
              <ProjectDetails/>
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <Dashboard/>
            }
          />
          <Route
            path="/admin/add-service"
            element={
              <AdminService/>
            }
          />
          <Route
            path="/admin/add-project"
            element={
              <AdminProject/>
            }
          />
          <Route
            path="/admin/edit-service/:service"
            element={
              <AdminService/>
            }
          />
          <Route
            path="/admin/edit-project/:project"
            element={
              <AdminProject/>
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
    </AuthProvider>
  );
}

export default App;
