import React, { useEffect, useState } from "react";
import ClientLayout from "../layouts/ClientLayout";
import InfoCard from "../components/InfoCard";
import cover from "../assets/main_Background.jpg";
import { getServices } from "../services/services";
import "../App.css";
import { Helmet } from "react-helmet";

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
      <div className="cover-container">
        <img src={cover} alt="Service cover" />
        <div className="cover-details">
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
