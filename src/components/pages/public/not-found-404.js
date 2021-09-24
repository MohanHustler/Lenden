import React from "react";
import "./not-found-404.scss";

const NotFound404 = props => {
  return (
    <div className="loading">
      <div className="loader">
        <div className="not-found-img">
          <img src={require("../../../assets/images/logopagenot.png")} />
        </div>
        <h1>404 Page Not Found</h1>
        <p> The page you were looking for doesn't exist. </p>
        <p> You may have mistyped the address or the page may have moved. </p>
        <p>
          {" "}
          If you are the application owner check the logs for more information.{" "}
        </p>
      </div>
    </div>
  );
};

export default NotFound404;
