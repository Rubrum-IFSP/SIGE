import React from "react";
import "./SobreNos.css";

interface Props {
  imageUrl: string;

  aboutMeText: string;
}

const AboutMeComponent: React.FC<Props> = ({ imageUrl, aboutMeText }) => {
  return (
    <div className="about-me-container">
      <img src={imageUrl} alt="Profile Image" className="profile-image" />

      <div className="about-me-info">
        <p>{aboutMeText}</p>
      </div>
    </div>
  );
};

export default AboutMeComponent;
