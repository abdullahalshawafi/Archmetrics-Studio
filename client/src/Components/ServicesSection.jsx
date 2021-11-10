import React from 'react';

export default function ServicesSection({ imgUrl, title, description }) {
    return (
        <React.Fragment>
            <div className="SecondSectionInfo">
                <img src={imgUrl} className="img" alt="info" />
                <div className="Details">
                    <h4 className="title">{title}</h4>
                    <h5 className="Description">{description}</h5>
                </div>
            </div>
        </React.Fragment>
    );
}