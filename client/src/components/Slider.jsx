import React from "react";
import { Carousel } from "react-responsive-carousel";

function Slider() {
  const sliderContent = [
    {
      header: "We are a BIM Specialist Team.",
      text: "All of our services are based on BIM.",
    },
    {
      header: "In data we trust.",
      text: "We will work with you to extract, visualize and understand you building data.",
    },
    {
      header: "Software customization is the name of the game.",
      text: "We can work with you to create new tools and accelerate your workflows.",
    },
  ];

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
        {sliderContent.map((item, index) => (
          <div key={index} className="text-container">
            <h1>{item.header}</h1>
            <p>{item.text}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
