import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styles from "./loan.module.scss";

const Loan = ({
  loanPurpose,
  setLoanPurpose,
  loanPurposeLength,
  setLoanPurposeLength
}) => {
  const selectFilterHandle = purpose => {
    const found =
      loanPurpose && loanPurpose.find(loanEle => loanEle === purpose);
    if (found !== "" && found !== purpose) {
      setLoanPurpose(prevProps => [...prevProps, purpose]);
      setLoanPurposeLength(loanPurposeLength + 1);
    } else {
      let index = loanPurpose.indexOf(found);
      let newArr = loanPurpose.splice(index, 1);
      setLoanPurpose(loanPurpose);
      setLoanPurposeLength(loanPurposeLength - 1);
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
              Purpose<span className={styles.count}>{loanPurposeLength}</span>
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
              <li onClick={() => selectFilterHandle("Home Renovation")}>
                <label>Home Renovation</label>
              </li>
              <li onClick={() => selectFilterHandle("Debt Consolidation")}>
                <label>Debt Consolidation</label>
              </li>
              <li onClick={() => selectFilterHandle("Medical Emergency")}>
                <label>Medical Emergency</label>
              </li>
              <li onClick={() => selectFilterHandle("Rental Deposit")}>
                <label>Rental Deposit</label>
              </li>
              <li onClick={() => selectFilterHandle("Wedding Loan")}>
                <label>Wedding Loan</label>
              </li>
              <li onClick={() => selectFilterHandle("Vacation Loan")}>
                <label>Vacation Loan</label>
              </li>
              <li onClick={() => selectFilterHandle("Family Function Loan")}>
                <label>Family Function Loan</label>
              </li>
              <li onClick={() => selectFilterHandle("Advance Salary")}>
                <label>Advance Salary</label>
              </li>
              <li onClick={() => selectFilterHandle("Business Purpose")}>
                <label>Business Purpose</label>
              </li>
              <li onClick={() => selectFilterHandle(">Education")}>
                <label>Education</label>
              </li>
              <li onClick={() => selectFilterHandle("Home Appliance Purchase")}>
                <label>Home Appliance Purchase</label>
              </li>
              <li onClick={() => selectFilterHandle("Car Purchase")}>
                <label>Car Purchase</label>
              </li>
              <li onClick={() => selectFilterHandle("Two Wheelere Purchase")}>
                <label>Two Wheelere Purchase</label>
              </li>
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Loan;
