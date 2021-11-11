import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import NavbarMobile from "./components/NavbarMobile";
import { useMediaQuery } from "react-responsive";
import "./App.css";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [pathname, setPathname] = useState("home");
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const IsMobile = useMediaQuery({ query: "(max-width:480px)" });
    
  return (
    <Router>
      {IsMobile ? <NavbarMobile pathname={pathname} /> : <Navbar pathname={pathname} /> }
      <Routes>
        <Route path="/" element={<Home setPathname={setPathname} />} />
        <Route path="/services" element={<Services setPathname={setPathname} />} />
      </Routes>
      <Footer />

      {showButton && (
        <div className="back-top-container" onClick={scrollToTop} >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      )}
    </Router>
  );
}

export default App;
