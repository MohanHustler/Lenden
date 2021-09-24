import React from "react";

import "./notification.scss";

const Notification = () => {
  return (
    <div className="notification-card">
        <span>view all</span>
      <div className="notification-card-top">
        <div className="notificaiton-card-img">
          <img
            src={require("../../../../../../assets/images/more/bell.png")}
            alt="img"
          />
        </div>
        <h2>Notification</h2>
      </div>
      <div className="notification-card-bottom">
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
};
export default Notification;
