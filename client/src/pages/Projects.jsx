import React, { useEffect, useState } from 'react';
import ClientLayout from '../layouts/ClientLayout';
import InfoCard from '../components/InfoCard';
import cover from '../assets/main_Background.jpg';
import { getProjects } from '../services/projects';
import '../App.css';
import { Helmet } from 'react-helmet';
import { useMainContext } from '../contexts/MainContext';
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const { setPathname, pathname } = useMainContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname('projects');
  });

  useEffect(() => {
    getProjects(setProjects);
  }, []);

  return (
    <ClientLayout>
      <Helmet>
        <title>Archmetrics | Projects</title>
      </Helmet>
      <div
        className="slider-container cover-details"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div style={{ paddingTop: '67px' }}>
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
