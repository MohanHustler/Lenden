import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styles from "./stay.module.scss";

const Stay = ({ funded, setFunded, fundedLength, setFundedLength }) => {
  const selectFilterHandle = fund => {
    const found = funded && funded.find(fundEle => fundEle === fund);
    if (found !== "" && found !== fund) {
      setFunded(prevProps => [...prevProps, fund]);
      setFundedLength(fundedLength + 1);
    } else {
      let index = funded.indexOf(found);
      let newArr = funded.splice(index, 1);
      setFunded(funded);
      setFundedLength(fundedLength - 1);
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
              Funded<span className={styles.count}>{fundedLength}</span>
            </label>
            <span>
              <img
                src={require("../../../../../../../assets/images/lenden/down-arrow.png")}
              />
            </span>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={styles.filterLoanExpandContent}>
            <ul>
              <li onClick={() => selectFilterHandle("Below 20%")}>
                <label>Below 20%</label>
              </li>
              <li onClick={() => selectFilterHandle("20%-40%")}>
                <label>20%-40%</label>
              </li>
              <li onClick={() => selectFilterHandle("40%-60%")}>
                <label>40%-60%</label>
              </li>
              <li onClick={() => selectFilterHandle("60%-80%")}>
                <label>60%-80%</label>
              </li>
              <li onClick={() => selectFilterHandle("Above 80%")}>
                <label>Above 80%</label>
              </li>
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Stay;
