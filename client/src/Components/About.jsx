import React, { useState } from "react";

function About() {
  const [selectedAbout, setSelectedAbout] = useState("manifesto");

  const aboutText = {
    manifesto:
      "Bad Monkeys are out to put a dent in the AEC industry. We want to change how people construct the world around them. Our goal is to change people’s attitudes, towards sharing and collaboration so that we can all create something that will last forever.",
    vision:
      "We have a vision of a different AEC industry. One in which companies work together, share and support their effort in order to build a better world around us. We want to build bridges not walls.",
  };

  const handleClick = (e) => {
    setSelectedAbout(e.target.innerHTML);
  };

  return (
    <div className="about-container">
      <div>
        <div className="headers-container">
          <p
            className={selectedAbout === "manifesto" ? "active" : ""}
            onClick={handleClick}
          >
            manifesto
          </p>
          <p
            className={selectedAbout === "vision" ? "active" : ""}
            onClick={handleClick}
          >
            vision
          </p>
        </div>
      </div>
      <p className="about-text">{aboutText[selectedAbout]}</p>
    </div>
  );
}

export default About;
