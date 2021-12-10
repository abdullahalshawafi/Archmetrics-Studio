import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
// import InfoCard from "../components/InfoCard";
import { projects } from "../services/data";

function ProjectDetails({ pathname, setPathname }) {
  let { project } = useParams();
  project = projects.find(({ slug }) => slug === project);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("");
  });

  return (
    <ClientLayout pathname={pathname}>
      <div className="cover-container">
        <img src={project.cover} alt="Project cover" />
        <div className="cover-details">
          <h1>{project.title}</h1>
        </div>
      </div>
      <div className="project-details">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
    </ClientLayout>
  );
}

export default ProjectDetails;
