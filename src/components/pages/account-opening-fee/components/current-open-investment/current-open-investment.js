import React from "react";

import "./current-open-investment.scss";

const CurrentOpenInvestment = props => {
  const topTwentyInvest = props.topTwentyInvest;

  return (
    <div className="investment-sec">
      <div className="investment-title">
        <h2>Current open investment</h2>
      </div>
      <div className="investment-card-sec">
        {topTwentyInvest &&
          topTwentyInvest.map((invest, index) => {
            return (
              <div
                className="investment-card"
                key={`current-investment-${index}`}
              >
                <ul>
                  <li>
                    <label>Interest Rate</label>
                    <span>{invest.interest_rate}</span>
                  </li>
                  <li>
                    <label>Amount</label>
                    <span>{invest.amount}</span>
                  </li>
                  <li>
                    <label>Tenure</label>
                    <span>{invest.tenure}</span>
                  </li>
                  <li>
                    <label>Purpose</label>
                    <span>{invest.purpose}</span>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CurrentOpenInvestment;
