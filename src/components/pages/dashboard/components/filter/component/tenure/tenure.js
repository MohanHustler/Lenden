import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styles from "./tenure.module.scss";

const Tenure = ({ tenure, setTenure, tenureLength, setTenureLength }) => {
  const selectFilterHandle = tenureData => {
    const found = tenure && tenure.find(riskEle => riskEle === tenureData);
    if (found !== "" && found !== tenureData) {
      setTenure(prevProps => [...prevProps, tenureData]);
      setTenureLength(tenureLength + 1);
    } else {
      let index = tenure.indexOf(found);
      let newArr = tenure.splice(index, 1);
      setTenure(tenure);
      setTenureLength(tenureLength - 1);
    }
  };

  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={styles.filterCollaps}>
            <label>
              Tenure<span className={styles.count}>{tenureLength}</span>
            </label>
            <span>
              <img
                src={require("../../../../../../../assets/images/lenden/down-arrow.png")}
              />
            </span>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={styles.filterTenureExpandContent}>
            <ul>
              <li onClick={() => selectFilterHandle("1")}>
                <label>1 month</label>
              </li>
              <li onClick={() => selectFilterHandle("2")}>
                <label>2 month</label>
              </li>
              <li onClick={() => selectFilterHandle("3")}>
                <label>3 month</label>
              </li>
              <li onClick={() => selectFilterHandle("6")}>
                <label>6 month</label>
              </li>
              <li onClick={() => selectFilterHandle("9")}>
                <label>9 month</label>
              </li>
              <li onClick={() => selectFilterHandle("12")}>
                <label>12 month</label>
              </li>
              <li onClick={() => selectFilterHandle("15")}>
                <label>15 month</label>
              </li>
              <li onClick={() => selectFilterHandle("18")}>
                <label>18 month</label>
              </li>
              <li onClick={() => selectFilterHandle("21")}>
                <label>21 month</label>
              </li>
              <li onClick={() => selectFilterHandle("24")}>
                <label>24 month</label>
              </li>
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Tenure;
