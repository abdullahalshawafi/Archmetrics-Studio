import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
// import { Carousel } from "react-responsive-carousel";
import "../App.css";
import "react-image-gallery/styles/css/image-gallery.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function ImagesGallery({ data }) {
  const [images, setImages] = useState([""]);

  useEffect(() => {
    const galleryImages = data.map((image) => ({
      original: image,
      thumbnail: image,
      loading: "lazy",
    }));
    console.log(galleryImages);
    setImages(galleryImages);
  }, [data]);

  return (
    <div className="Gallery">
      <div style={{ textAlign: "center" }}>
        <ImageGallery
          items={images}
          lazyLoad
          showPlayButton={false}
          showBullets
          showIndex
          slideDuration={800}
        />
      </div>
    </div>
  );
}

export default ImagesGallery;
