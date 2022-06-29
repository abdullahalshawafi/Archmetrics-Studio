import React, { useEffect} from "react";
import Slider from "../components/Slider";
import Statements from "../components/Statements";
import Info from "../components/Info";
import About from "../components/About";
import TopProjects from "../components/TopProjects";
import ContactUs from "../components/ContactUs";
import ClientLayout from "../layouts/ClientLayout";
import {useAuthContext} from '../helpers/AuthContext';

function Home() {
  const {setPathname} = useAuthContext();
  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("home");
  });
  
  return (
    <ClientLayout>
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
