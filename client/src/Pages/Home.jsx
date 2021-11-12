import React, { useEffect } from "react";
import About from "../components/About";
import ContactUs from "../components/ContactUs";
import Info from "../components/Info";
import Slider from "../components/Slider";
import TeamMembers from "../components/TeamMembers";

function Home({ setPathname }) {
  useEffect(() => {
    setPathname("home");
  });

  return (
    <div>
      <Slider />
      <About />
      <Info />
      <TeamMembers/>
      <ContactUs />
    </div>
  );
}

export default Home;
