import React, { useEffect } from "react";
import Slider from "../components/Slider";
import InfoCard from "../components/InfoCard";
import project1 from "../assets/project 1.jpg";
import project2 from "../assets/project 2.jpg";
import "../App.css";
import ClientLayout from "../layouts/ClientLayout";

export default function Projects({ pathname, setPathname }) {
  const projects = [
    {
      cover: project1,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: project2,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: project1,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: project2,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: project1,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
    {
      cover: project2,
      title: "Training",
      slug: "training",
      summary:
        "We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and time frame.",
    },
  ];

  useEffect(() => {
    setPathname("projects");
  });

  return (
    <ClientLayout pathname={pathname}>
      <Slider />
      <div className="projects">
        {projects.map(({ cover, title, slug, summary }, index) => (
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
