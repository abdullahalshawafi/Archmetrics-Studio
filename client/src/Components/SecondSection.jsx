import React from 'react';
export function SecondSection(props){
    const { imgUrl, title, description } = props;
    return <React.Fragment>
        <div className="SecondSectionInfo">
            <img src={imgUrl} className="img" alt="info"/>
            <div className="Details">
                <h4 className="title">{title}</h4>
                <h5 className="Description">{description}</h5>
            </div>
        </div>
    </React.Fragment>
}