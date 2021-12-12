import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import InfoCard from "../components/InfoCard";
import { services, projects } from "../services/data";

function ServiceDetails({ pathname, setPathname }) {
  let { service } = useParams();
  service = services.find(({ slug }) => slug === service);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("");
  });

  return (
    <ClientLayout pathname={pathname}>
      <div className="cover-container">
        <img src={service.cover} alt="Service cover" />
        <div className="cover-details">
          <h1>{service.title}</h1>
        </div>
      </div>
      <div className="service-details">
        <h1>{service.title}</h1>
        <p>{service.description}</p>
      </div>
      <div className="recent-projects-container">
        <h1>Recent related projects</h1>
        <div className="recent-projects d-flex flex-md-row flex-column">
          {projects.slice(0, 3).map(({ summary, ...project }, index) => (
            <InfoCard key={index} type="projects" info={project} />
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}

export default ServiceDetails;
