import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import InfoCard from "../components/InfoCard";
import { getSingleService } from "../services/services";

function ServiceDetails({ pathname, setPathname }) {
  let { service } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname("");
  });

  useEffect(() => {
    getSingleService(service, setServiceDetails);
  }, [service]);

  return (
    <ClientLayout pathname={pathname}>
      {serviceDetails && (
        <div>
          <div className="cover-container">
            <img src={serviceDetails.cover} alt="Service cover" />
            <div className="cover-details">
              <h1>{serviceDetails.title}</h1>
            </div>
          </div>
          <div className="service-details">
            <p>{serviceDetails.description}</p>
          </div>
          {serviceDetails.projects.length && (
            <div className="recent-projects-container">
              <h1>Recent related projects</h1>
              <div className="recent-projects d-flex flex-md-row flex-column">
                {serviceDetails.projects.map(
                  ({ summary, ...project }, index) => (
                    <InfoCard key={index} type="projects" info={project} />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </ClientLayout>
  );
}

export default ServiceDetails;
