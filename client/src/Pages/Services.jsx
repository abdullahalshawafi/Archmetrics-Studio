import React, { useEffect } from "react";
import Slider from "../components/Slider";
import ServicesSection from "../components/ServicesSection";
import firstImg from "../assets/firstImg.png";
import "../App.css";

export default function Services({ setPathname, setShowNavbar }) {
  useEffect(() => {
    setPathname("services");
    setShowNavbar(true);
  });

  return (
    <div>
      <Slider />
      <div className="SecondSection">
        <ServicesSection
          imgUrl={firstImg}
          title="Training"
          description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame."
        />
        <ServicesSection
          imgUrl={firstImg}
          title="Training"
          description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame."
        />
        <ServicesSection
          imgUrl={firstImg}
          title="Training"
          description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame."
        />
        <ServicesSection
          imgUrl={firstImg}
          title="Training"
          description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame."
        />
        <ServicesSection
          imgUrl={firstImg}
          title="Training"
          description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame."
        />
        <ServicesSection
          imgUrl={firstImg}
          title="Training"
          description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame."
        />
      </div>
    </div>
  );
}
