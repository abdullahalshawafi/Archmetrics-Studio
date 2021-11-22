import React, { useEffect } from "react";
import Slider from "../components/Slider";
import About from "../components/About";
import Info from "../components/Info";
import TeamMembers from "../components/TeamMembers";
import ContactUs from "../components/ContactUs";
import ClientLayout from "../layouts/ClientLayout";

function Home({ pathname, setPathname }) {
  useEffect(() => {
    setPathname("home");
  });

  return (
    <ClientLayout pathname={pathname}>
      <Slider />
      <About />
      <Info />
      <TeamMembers />
      <ContactUs />
    </ClientLayout>
  );
}

export default Home;
