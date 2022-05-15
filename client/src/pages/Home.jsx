import React, { useEffect } from "react";
import Slider from "../components/Slider";
import Statements from "../components/Statements";
import Info from "../components/Info";
import About from "../components/About";
import TopProjects from "../components/TopProjects";
import ContactUs from "../components/ContactUs";
import ClientLayout from "../layouts/ClientLayout";

function Home({ pathname, setPathname }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("home");
  });

  return (
    <ClientLayout pathname={pathname}>
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
