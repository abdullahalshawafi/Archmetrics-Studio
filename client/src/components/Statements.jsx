import React, { useState } from "react";

function Statements() {
  const [selectedStatement, setSelectedStatement] = useState("mission");

  const [statements] = useState([
    {
      statement: "mission",
      text: "The mission of AMC Engineering, Inc. is to provide engineering and technical solutions that are responsive to our clients' needs in an innovative, cost effective, professional, quality service manner. We will accomplish this by utilizing our common values and in achieving our business objective of having you as a satisfied client.",
    },
    {
      statement: "vision",
      text: "The Company continues to move forward in become the leading multi-discipline engineering company providing project engineering, project management, engineering studies, construction and maintenance works in Egypt, by consistently delivering projects that meet international standards.",
    },
    {
      statement: "values",
      text: "Integrity - We behave ethically and are respectful, open, and honest in our business and personal lives. Quality Engineering - We provide high-quality engineering to meet client needs. Client Satisfaction - We engage our clients and the communities we serve so that they know us, trust, and value our services. Technical Innovation - We develop better engineering solutions through research and development. Employee Loyalty - We make every effort to attract and retain excellent, motivated employees, who are the source of our success.",
    },
  ]);

  const handleClick = (e) => {
    setSelectedStatement(e.target.innerHTML);
  };

  return (
    <div className="statements-container">
      <div>
        <div className="headers-container">
          <p
            className={selectedStatement === "mission" ? "active" : ""}
            onClick={handleClick}
          >
            mission
          </p>
          <p
            className={selectedStatement === "vision" ? "active" : ""}
            onClick={handleClick}
          >
            vision
          </p>
          <p
            className={selectedStatement === "values" ? "active" : ""}
            onClick={handleClick}
          >
            values
          </p>
        </div>
      </div>
      {statements.map(({ statement, text }, index) => {
        if (statement === selectedStatement) {
          return (
            <p key={index} data-aos="fade" data-aos-duration="1000">
              {text}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Statements;
