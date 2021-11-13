import React from "react";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import first from "../assets/1.jpg";
import second from "../assets/2.jpg";
import third from "../assets/3.jpg";
import fourth from "../assets/4.jpg";
import fifth from "../assets/5.jpg";
import { useMediaQuery } from "react-responsive";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function TeamMembers() {
  const IsMobile = useMediaQuery({ query: "(max-width:480px)" });
  return (
    <div className="Team-Members-container">
      <div className="Team-Members-details">
        <h1>Team Members</h1>
        <hr />
        <p>
          Meet the Bad Monkeys behind all of those Dynamo and Grasshopper
          plug-ins. We are here to listen to your needs and provide expert
          advice.
        </p>
      </div>
      <div className="Members">
        <CarouselProvider
          className="img-slider"
          naturalSlideHeight={IsMobile ? 400 : 400}
          naturalSlideWidth={400}
          totalSlides={5}
          visibleSlides={IsMobile ? 1 : 5}
        >
          <Slider>
            <Slide className="Div1">
              <img className="Member" src={first} alt="first" />
              <div className="hiddenDiv">
                <h3>Håvard Vasshaug</h3>
                <h5>Design Technology Specialist</h5>
                <hr />
                <p className="HiddenParagraph">
                  Håvard's best known for his passion for knowledge sharing and
                  epic on stage performances. He's a Structural Engineer with a
                  knack for creative design solutions.
                </p>
              </div>
            </Slide>
            <Slide className="Div2">
              <img className="Member" src={second} alt="first" />
              <div className="hiddenDiv">
                <h3>Dimitar Venkov</h3>
                <h5>Design Technology Specialist</h5>
                <hr />
                <p className="HiddenParagraph">
                  Dimitar is a real Dynamo and Design Script guru. He roams the
                  Dynamo forum in hopeless search for question that would stomp
                  him.
                </p>
              </div>
            </Slide>
            <Slide className="Div3">
              <img className="Member" src={third} alt="first" />
              <div className="hiddenDiv">
                <h3>Julien Benoit</h3>
                <h5>Design Technology Specialist</h5>
                <hr />
                <p className="HiddenParagraph">
                  Julien's the calm and collected father figure that has "seen
                  it all", and "done it before". He specializes is construction
                  processes that need more than standard solutions.
                </p>
              </div>
            </Slide>
            <Slide className="Div4">
              <img className="Member" src={fourth} alt="first" />
              <div className="hiddenDiv">
                <h3>Konrad K Sobon</h3>
                <h5>Design Technology Specialist</h5>
                <hr />
                <p className="HiddenParagraph">
                  Konrad's main focus lies in practical automation of everyday
                  tasks. He specializes in interoperability and UI design.
                </p>
              </div>
            </Slide>
            <Slide className="Div5">
              <img className="Member" src={fifth} alt="first" />
              <div className="hiddenDiv">
                <h3>Adam Sheather</h3>
                <h5>Design Technology Specialist</h5>
                <hr />
                <p className="HiddenParagraph">
                  Adam's specialty is web based applications and data
                  visualization dashboards.
                </p>
              </div>
            </Slide>
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  );
}
