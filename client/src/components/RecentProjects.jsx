import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { useMediaQuery } from "react-responsive";
import "pure-react-carousel/dist/react-carousel.es.css";
import { getProjects } from "../services/projects";

export default function RecentProjects() {
  const [projects, SetProject] = useState([]);

  useEffect(() => {
    getProjects(SetProject);
  }, []);

  if (projects.length >= 5) {
    projects.length = 5;
  }

  const IsMobile = useMediaQuery({ query: "(max-width:480px)" });
  return projects ? (
    <div className="Team-Members-container">
      <div className="Team-Members-details">
        <h1>Recent Projects</h1>
        <hr />
        <p>Have a look at our recent projects.</p>
      </div>
      <div className="Members">
        <CarouselProvider
          className="img-slider"
          naturalSlideHeight={IsMobile ? 400 : 400}
          naturalSlideWidth={400}
          totalSlides={Math.min(5, projects.length)}
          visibleSlides={IsMobile ? 1 : Math.min(5, projects.length)}
        >
          <Slider>
            {projects.map((project, index) => (
              <Slide className="member-slide">
                <Link to={`/projects/${project.slug}`}>
                  <img className="Member" src={project.cover} alt={index} />
                  <div className="hiddenDiv">
                    <h1>{project.title}</h1>
                  </div>
                </Link>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  ) : null;
}
