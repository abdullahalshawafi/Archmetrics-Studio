import React, { useEffect } from "react";
import Slider from "../components/Slider";
import InfoCard from "../components/InfoCard";
import service1 from "../assets/service 1.jpg";
import service2 from "../assets/service 2.jpg";
import "../App.css";
import ClientLayout from "../layouts/ClientLayout";

export default function Services({ pathname, setPathname }) {
  const services = [
    {
      cover: service1,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: service2,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: service1,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: service2,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: service1,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: service2,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
  ];

  useEffect(() => {
    setPathname("services");
  });

  return (
    <ClientLayout pathname={pathname}>
      <Slider />
      <div className="services">
        {services.map(({ cover, title, slug, summary }, index) => (
          <InfoCard
            key={index}
            type={pathname}
            cover={cover}
            title={title}
            slug={slug}
            summary={summary}
          />
        ))}
      </div>
    </ClientLayout>
  );
}
