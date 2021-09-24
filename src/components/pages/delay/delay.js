import React from "react";
import "./delay.scss";
import DelayRow from "./delay-row";
import Header from "../../layout/header/header";

const Delay = () => {
  return (
    <div className="delay-wrapper">
      <Header />
      <div className="delay-container">
        <div className="common-table-heading">
          <h2>Delay1 Loans</h2>
          <div className="common-table-desc">
            <p>List of all loans in delay 1 (1 - 30 Days)</p>
            <label>
              Total Loans<span>289</span>
            </label>
          </div>
        </div>
        <div className="common-table">
          <table>
            <tr>
              <th>Name</th>
              <th>Loan Id</th>
              <th>Invested</th>
              <th>Current Due</th>
              <th>Tenure</th>
              <th>Due Date</th>
            </tr>
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
            <DelayRow />
          </table>
        </div>
        <div className="delay-footer">
          <div className="delay-footer-sec">
            <button className="blue-btn">
              Download Investment Statement
              <span>
                <img src={require("../../../assets/images/download.png")} />
              </span>
            </button>
            <lable>
              More
              <span>
                <img src={require("../../../assets/images/right-arrow.png")} />
              </span>
            </lable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delay;
