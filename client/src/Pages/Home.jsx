import React, { useEffect } from "react";
import About from "../components/About";
import ContactUs from "../components/ContactUs";
import Info from "../components/Info";
import Slider from "../components/Slider";

function Home({ setPathname }) {
  useEffect(() => {
    setPathname("home");
  });

  return (
    <div>
      <Slider />
      <About />
      <Info />
      <ContactUs />
    </div>
  );
}

export default Home;
