import React from "react";
import {
  faBeer,
  faChartLine,
  faCogs,
  faGlobe,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faOsi } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Info() {
  const infoCards = [
    {
      icon: faOsi,
      title: "Open Source",
      desc: "We believe in the power of Open Source community. Archmetrics have built and contributed to a number of Open Source tools, that we hope others find useful.",
    },
    {
      icon: faUsers,
      title: "Community Based",
      desc: "Archmetrics have a very active members of various communities. We believe that great things come from collaboration and knowledge sharing.",
    },
    {
      icon: faChartLine,
      title: "Data Driven",
      desc: "We understand that great projects have a strong foundation built on empirical data. That's why we empower and enable data-driven designs by providing data visualization and dashboard services.",
    },
    {
      icon: faCogs,
      title: "Tools & Technology",
      desc: "We know your tools matter to you. That's why we have mastered them. We believe that technology has the power to improve people's life and we are willing to prove it to you!",
    },
    {
      icon: faGlobe,
      title: "Global",
      desc: "Our team members are located in Egypt. Our diversity of locations, knowledge and background allows us to find common language with anyone and anywhere. Collaboration at its finest!",
    },
    {
      icon: faBeer,
      title: "Fun",
      desc: "We know that building the world around us is hard work. That's why Archmetrics like to work hard and have fun while doing it. We enjoy the occasional drinks with friends and time with our families.",
    },
  ];
  return (
    <div className="info-container">
      <div>
        {infoCards.map((card, index) => {
          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={`${
                (index % Math.floor(infoCards.length / 2)) * 150
              }`}
              className="info-card"
            >
              <div className="icon-container">
                <FontAwesomeIcon icon={card.icon} />
              </div>
              <div className="card-details">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Info;
