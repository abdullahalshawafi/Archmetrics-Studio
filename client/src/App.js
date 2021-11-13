import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import "./App.css";

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
    let prevScrollPos = window.pageYOffset;

    const handleWindowScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-100%";
      }

      prevScrollPos = currentScrollPos;

      setShowButton(window.pageYOffset > 300 ? true : false);
    }

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    }
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width:480px)" });

  return (
    <Router>
      {isMobile ? <NavbarMobile pathname={pathname} /> : <Navbar pathname={pathname} />}
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
