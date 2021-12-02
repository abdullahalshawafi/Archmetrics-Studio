import React from "react";
import { Link } from "react-router-dom";

export default function InfoCard({ type, cover, title, slug, summary }) {
  return (
    <Link to={`/${type}/${slug}`}>
      <div className="info-card">
        <img src={cover} className="img" alt="info" />
        <div className="details">
          <h3>{title}</h3>
          <h5>{summary}</h5>
        </div>
      </div>
    </Link>
  );
}
