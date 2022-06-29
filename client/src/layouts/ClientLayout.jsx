import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import 'aos/dist/aos.css';

function ClientLayout({ children }) {
  const [isNavHidden, setIsNavHidden] = useState(false);

  useEffect(() => {
    AOS.init();
    let prevScrollPos = window.pageYOffset;
    const handleWindowScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setIsNavHidden(false);
      } else {
        setIsNavHidden(true);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width:630px)' });

  return (
    <div>
      {isMobile ? (
        <NavbarMobile isNavHidden={isNavHidden} />
      ) : (
        <Navbar isNavHidden={isNavHidden} />
      )}
      {children}
      <Footer />

      <BackToTop />
    </div>
  );
}

export default ClientLayout;
