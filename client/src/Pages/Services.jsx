import React, { useEffect } from "react";
import ClientLayout from "../layouts/ClientLayout";
import Slider from "../components/Slider";
import InfoCard from "../components/InfoCard";
import { services } from "../services/data";
import "../App.css";

export default function Services({ pathname, setPathname }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("services");
  });

  return (
    <ClientLayout pathname={pathname}>
      <Slider />
      <div className="services">
        {services.map((service, index) => (
          <InfoCard key={index} type={pathname} info={service} />
        ))}
      </div>
    </ClientLayout>
  );
}
