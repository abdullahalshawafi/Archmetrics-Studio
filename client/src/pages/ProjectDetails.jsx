import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import ClientLayout from "../layouts/ClientLayout";
import { getSingleProject } from "../services/projects";

function ProjectDetails({ pathname, setPathname }) {
  let { project } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("");
  });

  useEffect(() => {
    getSingleProject(project, setProjectDetails);
  }, [project]);

  return (
    <ClientLayout pathname={pathname}>
      {projectDetails && (
        <div>
          <div className="cover-container">
            <img src={projectDetails.cover} alt="Project cover" />
            <div className="cover-details">
              <h1>{projectDetails.title}</h1>
              <h4>
                {moment(new Date(projectDetails.date)).format("MMMM D, YYYY")}
              </h4>
            </div>
          </div>
          <div className="project-details-container row mx-0">
            <div className="project-details col-12 mb-3 text-center">
              <h1>{projectDetails.title}</h1>
            </div>
            <div className="project-details col-12 col-md-3 mb-3">
              <h4>Client:</h4>
              <p>{projectDetails.client}</p>
              <h4>Services provided:</h4>
              {projectDetails.services.map((service, index) => (
                <Link to={`/services/${service.slug}`} key={index}>
                  <p className="mb-0">{service.title}</p>
                </Link>
              ))}
            </div>
            <div className="project-details col-12 col-md-9">
              <h4>Project Description:</h4>
              <p>{projectDetails.description}</p>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}

export default ProjectDetails;
