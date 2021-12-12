import React, { useEffect } from "react";
import ClientLayout from "../layouts/ClientLayout";
import InfoCard from "../components/InfoCard";
import cover from "../assets/main_Background.jpg";
import { projects } from "../services/data";
import "../App.css";

export default function Projects({ pathname, setPathname }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("projects");
  });

  return (
    <ClientLayout pathname={pathname}>
      <div className="cover-container">
        <img src={cover} alt="Service cover" />
        <div className="cover-details">
          <h1>These are our projects</h1>
        </div>
      </div>
      <div className="projects">
        {projects.map((project, index) => (
          <InfoCard key={index} type={pathname} info={project} />
        ))}
      </div>
    </ClientLayout>
  );
}
