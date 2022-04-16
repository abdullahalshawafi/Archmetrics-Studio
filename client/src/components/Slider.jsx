import React from "react";
import { Carousel } from "react-responsive-carousel";

function Slider() {
  return (
    <div className="slider-container">
      <Carousel
        autoPlay
        emulateTouch
        infiniteLoop
        stopOnHover
        showStatus={false}
        showThumbs={false}
        axis="horizontal"
        className="custom-carousel"
      >
        <div className="text-container">
          <h1>In data we trust.</h1>
          <p>
            We will work with you to extract, visualize and understand you
            building data.
          </p>
        </div>
        <div className="text-container">
          <h1>We are a BIM Specialist Team.</h1>
          <p>All of our services are based on BIM.</p>
        </div>
        <div className="text-container">
          <h1>Software customization is the name of the game.</h1>
          <p>
            We can work with you to create new tools and accelerate your
            workflows.
          </p>
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
