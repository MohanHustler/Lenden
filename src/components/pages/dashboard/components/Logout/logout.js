import React from "react";
import { useHistory } from "react-router-dom";

import "./logout.scss";

import { clearLocalStorage } from "../../../../../api-integrations/common/local-storage";

const Logout = () => {
  let history = useHistory();

  const triggerLogout = () => {
    clearLocalStorage();
    history.push("/signin");
  };

  return (
    <div>
      {/* logout section */}
      <div className="logout-section">
        <div className="sections">
          <ul>
            <li>
              <label>
                <img
                  src={require("../../../../../assets/images/menu/person.png")}
                />
              </label>
              <span>Personal Details</span>
            </li>
            <li>
              <label>
                <img
                  src={require("../../../../../assets/images/menu/invest.png")}
                />
              </label>
              <span>Invest Now</span>
            </li>
            <li>
              <label>
                <img
                  src={require("../../../../../assets/images/menu/setting.png")}
                />
              </label>
              <span>Settings</span>
            </li>
            <li>
              <label>
                <img
                  src={require("../../../../../assets/images/menu/help-center.png")}
                />
              </label>
              <span>Help Center(FAQs)</span>
            </li>
            <li className="active">
              <label>
                <img
                  src={require("../../../../../assets/images/menu/logout.png")}
                />
              </label>
              <span
                onClick={() => {
                  triggerLogout();
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Logout;
