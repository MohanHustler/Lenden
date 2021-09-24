import React from "react";
import "./balance.scss";

const Balance = ({ accountBalance }) => {
  return (
    <div className="balance-sec">
      <h2>Wallet</h2>
      <div className="balance-currency-sec">
        <h3>Current Balance</h3>
        <div className="balance-curreny">
          <span>
            <img src={require("../../../../../assets/images/indiarupee.png")} />
          </span>
          <label>{accountBalance}</label>
        </div>
      </div>
    </div>
  );
};

export default Balance;
