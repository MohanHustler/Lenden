import React from "react";

import "./notification.scss";
import { NOTIFICATION_STATUS_UNREAD } from "../../../../../common/application-constants";

const Notification = props => {
  return (
    <div>
      <div className="notification-card1">
        <h1>Notifications 
        <p>mark all as read</p></h1>
        <div className="lorem">
          <div className="lorem-content">
            <ul>
              {props.notifications.map(notification => {
                const unReadNotification =
                  notification.status === NOTIFICATION_STATUS_UNREAD;
                return (
                  <li
                    key={`notification-${notification.id}`}
                    className={unReadNotification ? "active" : ""}
                  >
                    <label>
                      <img
                        src={require("../../../../../assets/images/lenden/notification/exclamation.png")}
                      />
                    </label>
                    <h2>{notification.message}</h2>
                    { <span>mark as Read</span> }
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
