import React, { useEffect } from "react";
import ClientLayout from "../layouts/ClientLayout";
import Slider from "../components/Slider";
import InfoCard from "../components/InfoCard";
import { projects } from "../services/data";
import "../App.css";

export default function Projects({ pathname, setPathname }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("projects");
  });

  return (
    <ClientLayout pathname={pathname}>
      <Slider />
      <div className="projects">
        {projects.map((project, index) => (
          <InfoCard key={index} type={pathname} info={project} />
        ))}
      </div>
    </ClientLayout>
  );
}
