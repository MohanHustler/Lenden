import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styles from "./risk-expand.module.scss";

const Risk = ({ riskCategory, setRiskCategory, riskLength, setRiskLength }) => {
  const [activeRisk, setActiveRisk] = useState("");

  const selectFilterHandle = risk => {
    const found =
      riskCategory && riskCategory.find(riskEle => riskEle === risk);
    if (found !== "" && found !== risk) {
      setActiveRisk(risk);
      setRiskCategory(prevProps => [...prevProps, risk]);
      setRiskLength(riskLength + 1);
    } else {
      let index = riskCategory.indexOf(found);
      let newArr = riskCategory.splice(index, 1);
      setRiskCategory(riskCategory);
      setRiskLength(riskLength - 1);
    }
  };
  return (
    <div className="filter-component">
      <ExpansionPanel>
        <ExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={styles.filterCollaps}>
            <label>
              Risk Profile<span className={styles.count}>{riskLength}</span>
            </label>
            <span>
              <img
                src={require("../../../../../../../assets/images/lenden/down-arrow.png")}
              />
            </span>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={styles.filterExpandContent}>
            <ul>
              <li
                onClick={() => selectFilterHandle("Unidentified")}
                // className={activeRisk === "Undefined" && styles.active}
              >
                <label>Unidentified</label>
                <span>40.5% - 50%</span>
              </li>
              <li onClick={() => selectFilterHandle("Ultra High")}>
                <label>Ultra High</label>
                <span>35.5% - 40%</span>
              </li>
              <li onClick={() => selectFilterHandle("Very High")}>
                <label>Very High</label>
                <span>30.5% - 35%</span>
              </li>
              <li onClick={() => selectFilterHandle("High")}>
                <label>High</label>
                <span>25.5% - 30%</span>
              </li>
              <li onClick={() => selectFilterHandle("Moderate")}>
                <label>Moderate</label>
                <span>20.5% - 25%</span>
              </li>
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Risk;
