import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styles from "./credit.module.scss";

const Credit = ({
  cibilScore,
  setCibilScore,
  cibilScoreLength,
  setCibilScoreLength
}) => {
  const selectFilterHandle = cibil => {
    const found = cibilScore && cibilScore.find(riskEle => riskEle === cibil);
    if (found !== "" && found !== cibil) {
      setCibilScore(prevProps => [...prevProps, cibil]);
      setCibilScoreLength(cibilScoreLength + 1);
    } else {
      let index = cibilScore.indexOf(found);
      let newArr = cibilScore.splice(index, 1);
      setCibilScore(cibilScore);
      setCibilScoreLength(cibilScoreLength - 1);
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
              Cibil Score
              <span className={styles.count}>{cibilScoreLength}</span>
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
              {/* className={styles.active} */}
              {/* <li onClick={() => selectFilterHandle("No Score")}>
                <label>No Score</label>
              </li> */}
              <li onClick={() => selectFilterHandle("Below 650")}>
                <label>Below 650</label>
              </li>
              <li onClick={() => selectFilterHandle("650 TO 750")}>
                <label>650 TO 750</label>
              </li>
              <li onClick={() => selectFilterHandle("700 TO 750")}>
                <label>700 TO 750</label>
              </li>
              <li onClick={() => selectFilterHandle("750 TO 800")}>
                <label>750 TO 800</label>
              </li>
              <li onClick={() => selectFilterHandle("Above 800")}>
                <label>Above 800</label>
              </li>
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Credit;
