import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import Statements from '../components/Statements';
import Info from '../components/Info';
import About from '../components/About';
import TopProjects from '../components/TopProjects';
import ContactUs from '../components/ContactUs';
import ClientLayout from '../layouts/ClientLayout';
import { useMainContext } from '../contexts/MainContext';
import { Helmet } from 'react-helmet';

function Home() {
  const { setPathname } = useMainContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname('home');
  });

  return (
    <ClientLayout>
      <Helmet>
        <title>Archmetrics</title>
      </Helmet>
      <Slider />
      <Statements />
      <Info />
      <About />
      <TopProjects />
      <ContactUs />
    </ClientLayout>
  );
}

export default Home;
