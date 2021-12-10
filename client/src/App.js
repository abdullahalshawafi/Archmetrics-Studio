import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddServices from "./pages/admin/AddService";
import AddProjects from "./pages/admin/AddProject";
import "./App.css";

function App() {
  const [pathname, setPathname] = useState("");
  const [adminPage, setAdminPage] = useState("dashboard");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home pathname={pathname} setPathname={setPathname} />} />
        <Route path="/services" element={<Services pathname={pathname} setPathname={setPathname} />} />
        <Route path="/services/:service" element={<ServiceDetails pathname={pathname} setPathname={setPathname} />} />
        <Route path="/projects" element={<Projects pathname={pathname} setPathname={setPathname} />} />
        <Route path="/projects/:project" element={<ProjectDetails pathname={pathname} setPathname={setPathname} />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard adminPage={adminPage} setAdminPage={setAdminPage} />} />
        <Route path="/admin/add-service" element={<AddServices adminPage={adminPage} setAdminPage={setAdminPage} />} />
        <Route path="/admin/add-project" element={<AddProjects adminPage={adminPage} setAdminPage={setAdminPage} />} />
      </Routes>
    </Router>
  );
}

export default App;
