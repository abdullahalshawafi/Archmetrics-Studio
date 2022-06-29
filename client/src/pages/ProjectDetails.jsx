import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useParams } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import { getSingleProject } from "../services/projects";
import ImageGallery from "../components/ImagesGallery";
import { useAuthContext } from "../helpers/AuthContext";

function ProjectDetails() {
  
  const { setPathname } = useAuthContext();
  let { project } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("");
  });

  useEffect(() => {
    getSingleProject(project, setProjectDetails, setError);
  }, [project]);

  if (error) {
    return <Navigate to="/projects" />;
  }

  return (
    <ClientLayout>
      {projectDetails && (
        <div>
          <Helmet>
            <title>Archmetrics | {projectDetails.title}</title>
          </Helmet>
          <div
            className="slider-container cover-details"
            style={{ backgroundImage: `url('${projectDetails.cover}')` }}
          >
            <div style={{ paddingTop: "67px" }}>
              <h1>{projectDetails.title}</h1>
              <h4>{projectDetails.year}</h4>
            </div>
          </div>
          <div className="project-details project-description">
            <h4>Project Description:</h4>
            <p style={{ whiteSpace: "pre-line", margin: 0 }}>
              {projectDetails.description}
            </p>
          </div>
          <div className="project-details-container row justify-content-between w-100 m-0">
            <div className="project-details col-sm-3 p-0">
              <h4>Client:</h4>
              <p>{projectDetails.client}</p>
              <h4>Location:</h4>
              <p>{projectDetails.location}</p>
              <h4>Area:</h4>
              <p>{projectDetails.area}</p>
              <h4>Type:</h4>
              <p>{projectDetails.type}</p>
              <h4>Stage:</h4>
              <p>{projectDetails.stage}</p>
              <h4>Services provided:</h4>
              {projectDetails.services.map((service, index) => (
                <Link to={`/services/${service.slug}`} key={index}>
                  <p className="mb-0">{service.title}</p>
                </Link>
              ))}
            </div>
            <div className="col-12 mb-4 col-sm-1"></div>
            <div className="project-details col-sm-8 p-0">
              {projectDetails.images && (
                <ImageGallery
                  data={projectDetails.images.map((image) => image.image)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}

export default ProjectDetails;
