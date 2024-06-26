import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';
import InfoCard from '../components/InfoCard';
import { getSingleService } from '../services/services';
import { Helmet } from 'react-helmet';
import ImagesGallery from '../components/ImagesGallery';
import { useMainContext } from '../contexts/MainContext';

function ServiceDetails() {
  let { service } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [error, setError] = useState(false);
  const { setPathname } = useMainContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname('');
  });

  useEffect(() => {
    getSingleService(service, setServiceDetails, setError);
  }, [service]);

  if (error) {
    return <Navigate to="/services" />;
  }

  return (
    <ClientLayout>
      {serviceDetails && (
        <div>
          <Helmet>
            <title>Archmetrics | {serviceDetails.title}</title>
          </Helmet>
          <div
            className="slider-container cover-details"
            style={{ backgroundImage: `url('${serviceDetails.cover}')` }}
          >
            <div style={{ paddingTop: '67px' }}>
              <h1>{serviceDetails.title}</h1>
            </div>
          </div>
          <div className="service-details">
            <p style={{ whiteSpace: 'pre-line' }}>
              {serviceDetails.description}
            </p>
            <div className="service-gallery mx-auto mt-5">
              {serviceDetails.images && (
                <ImagesGallery
                  showThumbnails={true}
                  disableKeyDown={false}
                  data={serviceDetails.images}
                />
              )}
            </div>
          </div>
          {serviceDetails.projects.length ? (
            <div className="recent-projects-container">
              <h1>Recent related projects</h1>
              <div className="recent-projects row">
                {serviceDetails.projects.map(
                  ({ summary, ...project }, index) => (
                    <div
                      key={project.slug}
                      className="col-12 col-md-6 col-lg-4 p-3"
                    >
                      <InfoCard key={index} type="projects" info={project} />
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </ClientLayout>
  );
}

export default ServiceDetails;
