import "../App.css";
import React, { useState,useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function ImageGallery({ data }) {
  const [images, setImages] = useState([""]);
  


  useEffect(() => {
    setImages(data);
  }, [data]);

  return (
    <div className="Gallery">
      <div style={{ textAlign: "center" }}>
        <div>
        <Carousel  interval="5000" transitionTime="1000">
                    
          {images.map((img)=>{
              
            return <div>
                  <img src={img.image} />
              </div>
              })
          }
 
        </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
