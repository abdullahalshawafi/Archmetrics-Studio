import { Link } from "react-router-dom";
import aboutVideo from "../assets/Archmetrics Video.mp4";

export default function About() {
  return (
    <section className="about-container">
      <div className="about-details">
        <h1>About Us</h1>
        <hr />
        <p>
          Learn more <Link to="/about">about us</Link>.
        </p>
      </div>
      <div className="about-content">
        <div className="about-content-text">
          <p>
            "Archmetrics is a modern engineering service providers which aim to
            use the latest technologies and softwares to serve all engineering
            community."
          </p>
          <p style={{ fontSize: "1.3rem", fontWeight: "800" }}>
            "Engineering of art"
          </p>
          <p style={{ alignSelf: "flex-end" }}>Archmetrics - AMC</p>
        </div>
        <div className="about-content-video">
          <video src={aboutVideo} controls></video>
        </div>
      </div>
    </section>
  );
}
