import { Carousel } from "react-carousel-minimal";
import "../App.css";

function ImageGallery({ data }) {
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div className="Gallery">
      <div style={{ textAlign: "center" }}>
        <div>
          <Carousel
            className="Gallery"
            data={data}
            time={2000}
            width="850px"
            height="500px"
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            automatic={false}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="150px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "600px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
