import React, { useEffect, useState } from "react";
import ClientLayout from "../layouts/ClientLayout";
import InfoCard from "../components/InfoCard";
import { Helmet } from "react-helmet";
import cover from "../assets/main_Background.jpg";
import { getServices } from "../services/services";
import "../App.css";

export default function Services({ pathname, setPathname }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("services");
  });

  useEffect(() => {
    getServices(setServices);
  }, []);

  return (
    <ClientLayout pathname={pathname}>
      <Helmet>
        <title>Archmetrics | Services</title>
      </Helmet>
      <div
        className="slider-container cover-details"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div style={{ paddingTop: "67px" }}>
          <h1>This is what we do</h1>
        </div>
      </div>
      <div className="services">
        {services.map((service, index) => (
          <InfoCard key={index} type={pathname} info={service} />
        ))}
      </div>
    </ClientLayout>
  );
}
