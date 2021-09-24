import React from "react";

import { Link } from "react-router-dom";

import "./profile.scss";

const Profile = ({ personalDetails }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-left">
        <div className="profile-card-img">
          <img
            src={require("../../../../../../assets/images/more/profile.png")}
            alt="img"
          />
        </div>
        <div className="profile-card-text">
          <h1>{personalDetails ? personalDetails.full_name : ""}</h1>
          <label>
            {" "}
            Investor ID :{" "}
            <span>{personalDetails ? personalDetails.lender_id : ""}</span>{" "}
            <img
              src={require("../../../../../../assets/images/more/copy.png")}
              alt="img"
            />
          </label>
        </div>
      </div>
      <div className="profile-card-right">
        <div className="profile-card-right-top">
          <h1>Basic Plan</h1>
        </div>
        <Link to="/plan" >Upgrade Now</Link>
      </div>
    </div>
  );
};

export default Profile;
