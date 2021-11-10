import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [pathname, setPathname] = useState("home");

  return (
    <Router>
      <Navbar pathname={pathname} />
      <Routes>
        <Route path="/" element={<Home setPathname={setPathname} />} />
        <Route path="/services" element={<Services setPathname={setPathname} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
