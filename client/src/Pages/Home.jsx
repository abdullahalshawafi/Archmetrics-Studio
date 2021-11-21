import React, { useEffect } from "react";
import Slider from "../components/Slider";
import About from "../components/About";
import Info from "../components/Info";
import TeamMembers from "../components/TeamMembers";
import ContactUs from "../components/ContactUs";

function Home({ setPathname, setShowNavbar }) {
  useEffect(() => {
    setPathname("home");
    setShowNavbar(true);
  });

  return (
    <div>
      <Slider />
      <About />
      <Info />
      <TeamMembers />
      <ContactUs />
    </div>
  );
}

export default Home;
