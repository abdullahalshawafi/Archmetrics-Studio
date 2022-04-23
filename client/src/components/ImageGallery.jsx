import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "../App.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function ImageGallery({ data }) {
  const [images, setImages] = useState([""]);

  useEffect(() => {
    setImages(data);
  }, [data]);

  return (
    <div className="Gallery">
      <div style={{ textAlign: "center" }}>
        <div>
          <Carousel interval="5000" transitionTime="1000">
            {images.map((img, index) => (
              <div key={index} style={{ display: "flex", height: "100%" }}>
                <img
                  src={img.image ? img.image : img}
                  alt={index + 1}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
