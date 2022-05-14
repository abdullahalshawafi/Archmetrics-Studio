import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { useMediaQuery } from "react-responsive";
import { getProjects } from "../services/projects";

import "pure-react-carousel/dist/react-carousel.es.css";

export default function TopProjects() {
  const [projects, SetProject] = useState([]);

  const IsMobile = useMediaQuery({ query: "(max-width:480px)" });

  useEffect(() => {
    getProjects(SetProject);
  }, []);

  if (projects.length >= 4) {
    projects.length = 4;
  }

  return projects.length ? (
    <div className="home-projects-container">
      <div className="home-projects-details">
        <h1>Top Projects</h1>
        <hr />
        <p>
          Have a look at our top projects. Or you can all of our{" "}
          <Link to="/projects">projects</Link>
        </p>
      </div>
      <div className="home-projects-slider">
        <CarouselProvider
          className="img-slider"
          naturalSlideHeight={IsMobile ? 400 : 600}
          naturalSlideWidth={1100}
          totalSlides={Math.min(4, projects.length)}
          visibleSlides={IsMobile ? 1 : 4}
        >
          <Slider>
            {projects.map((project, index) => (
              <Slide className="project-slide" key={index}>
                <Link to={`/projects/${project.slug}`}>
                  <img
                    className="project-img"
                    src={project.cover}
                    alt={index}
                  />
                  <div className="hiddenDiv">
                    <h1>{project.title}</h1>
                    <div className="project-year">
                      <h5>{project.year}</h5>
                    </div>
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
