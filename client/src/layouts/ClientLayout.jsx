import React, { useEffect, useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";

function ClientLayout({ pathname, children }) {
  const [showButton, setShowButton] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleWindowScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setIsNavHidden(false);
        // document.getElementById("navbar").style.transform = "translateY(0)";
      } else {
        setIsNavHidden(true);
        // document.getElementById("navbar").style.transform = "translateY(-100%)";
      }

      prevScrollPos = currentScrollPos;

      setShowButton(window.pageYOffset > 300 ? true : false);
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width:630px)" });

  return (
    <div>
      {isMobile ? (
        <NavbarMobile pathname={pathname} isNavHidden={isNavHidden} />
      ) : (
        <Navbar pathname={pathname} isNavHidden={isNavHidden} />
      )}
      {children}
      <Footer />

      {showButton && (
        <div className="back-top-container" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      )}
    </div>
  );
}

export default ClientLayout;
