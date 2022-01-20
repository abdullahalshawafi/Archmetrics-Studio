import React, { useEffect, useState } from "react";

import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { useMediaQuery } from "react-responsive";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  getProjects
} from "../services/projects";

export default function TeamMembers() {
  const[Projects,SetProject]=useState([])

  useEffect(()=>{
    getProjects(SetProject);
  }, [])
  if(Projects.length >= 5){
    Projects.length = 5;
  }
  const IsMobile = useMediaQuery({ query: "(max-width:480px)" });
  return (Projects.length === 5 ? (
    <div className="Team-Members-container">
      <div className="Team-Members-details">
        <h1>Recent Projects</h1>
      </div>
      <div className="Members">
        <CarouselProvider
          className="img-slider"
          naturalSlideHeight={IsMobile ? 400 : 400}
          naturalSlideWidth={400}
          totalSlides={5}
          visibleSlides={IsMobile ? 1 : 5}
        >
          <Slider>{
          Projects.map((project,index)=>(
            <Slide className="member-slide">
              <img className="Member" src={project.cover} alt={index} />
              <div className="hiddenDiv">
                <h3>{project.title}</h3>
                <h5>{project.slug}</h5>
                <hr />
                <p className="HiddenParagraph">
                  {project.description}
                </p>
              </div>
            </Slide> 
          ))}
          </Slider>
        </CarouselProvider>
      </div>
    </div>):null
  );
}
