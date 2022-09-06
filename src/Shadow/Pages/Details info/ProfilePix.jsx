import React from "react";
import "./profilepix.css";
import profileimage from "../../images/profileimage.png";
export const ProfilePix = (props) => {
  return (
    <div className="profile-prop">
      <div className="profile-picture">
        <img src={props.profileimage} alt="profile picture" />
      </div>
      <div className="profile-text">
        <h3>{props.name}</h3>
        <h6>{props.time}</h6>
      </div>
    </div>
  );
};
