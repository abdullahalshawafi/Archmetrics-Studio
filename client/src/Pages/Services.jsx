import React, { useEffect } from "react";
import ClientLayout from "../layouts/ClientLayout";
import InfoCard from "../components/InfoCard";
import cover from "../assets/main_Background.jpg";
import { services } from "../services/data";
import "../App.css";

export default function Services({ pathname, setPathname }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("services");
  });

  return (
    <ClientLayout pathname={pathname}>
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
