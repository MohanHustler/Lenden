import React from "react";
import "./income.scss"

const Income = () => {
  return (
    <div>
      <div className="income-card">
        <h2>20-Jan ‘ 20</h2>
        <label>Ref/2819/ahdd</label>
        <p>
          <span>
            <img src={require("../../../../../assets/images/indiarupee.png")} />
          </span>
          8,000
        </p>
      </div>
    </div>
  );
};
export default Income;
