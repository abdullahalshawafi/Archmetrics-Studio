import React from "react";
import { Link } from "react-router-dom";

export default function InfoCard({ type, info }) {
  return (
    <Link to={`/${type}/${info.slug}`}>
      <div className="info-details-container">
        <img src={info.cover} className="img" alt="info" />
        <div className={`details ${type.slice(0, type.length - 1)}`}>
          <h3>{info.title}</h3>
          <h5>{info.summary}</h5>
        </div>
      </div>
    </Link>
  );
}
