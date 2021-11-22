import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import "./App.css";

function App() {
  const [pathname, setPathname] = useState("home");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home pathname={pathname} setPathname={setPathname} />} />
        <Route path="/services" element={<Services pathname={pathname} setPathname={setPathname} />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
