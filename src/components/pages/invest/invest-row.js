import React, { useState, useEffect, useRef } from "react";
import styles from "./invest-row.module.scss";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import PieChart from "react-minimal-pie-chart";

import {
  ADDRESS_TYPE_PERMANENT,
  ADDRESS_TYPE_COMMUNICATION
} from "../../../common/application-constants";

const InvestRow = props => {
  const [currentDetails, setCurrentDetails] = useState("personal");
  const [expansionPanelOpen, setExpansionPanelOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  let user_info = props.userLoan.user_info;
  let credit_details = props.userLoan.credit_details;

  var permanentAddress = {};
  var communicationAddress = {};

  props.user.address.map(userAddress => {
    if (userAddress.type === ADDRESS_TYPE_PERMANENT) {
      permanentAddress = userAddress;
    } else if (userAddress.type === ADDRESS_TYPE_COMMUNICATION) {
      communicationAddress = userAddress;
    }
  });

  var address = permanentAddress ? permanentAddress : communicationAddress;

  const handleInvestDetails = data => {
    setCurrentDetails(data);
  };
  const expansionPanelHandle = () => {
    setExpansionPanelOpen(!expansionPanelOpen);
  };

  const checkboxHandle = userLoan => {
    setCheckboxChecked(!checkboxChecked);
    if (!checkboxChecked) {
      const data = {
        name: userLoan.user.first_name,
        loan_id: userLoan.required_loan_id,
        remaining_amount: userLoan.amount_remaining
      };
      props.setEmptyRow(prevProps => [...prevProps, data]);
    } else {
      const found = props.emptyRow.find(
        el => el.loan_id === userLoan.required_loan_id
      );
      let index = props.emptyRow.indexOf(found);
      let newArr = props.emptyRow.splice(index, 1);
      props.setEmptyRow(props.emptyRow);
      props.setInvestLength(props.emptyRow.length);
      if (!props.emptyRow.length) {
        props.setShowInvestButton(false);
      }
    }
  };
  return (
    <>
      <tr>
        <td colspan="8">
          <ExpansionPanel expanded={expansionPanelOpen}>
            <ExpansionPanelSummary
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <FormControlLabel
                className={`${!checkboxChecked ? "hide" : ""}`}
                aria-label="Acknowledge"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <Checkbox
                    checked={checkboxChecked}
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                  />
                }
              />
              <tr
                onClick={() => checkboxHandle(props.userLoan)}
                className={styles.customRow}
              >
                <td>{props.userName}</td>
                <td>{props.loanId}</td>
                <td>{props.intresetRate}%</td>
                <td>{props.creditScore}+</td>
                <td>{props.tenure} Month </td>
                <td>{props.purpose}</td>
                <td>{props.amount}</td>
                <td>{props.amountRemaining}</td>
              </tr>
              <span
                onClick={expansionPanelHandle}
                className={styles.arrowChange}
              >
                {expansionPanelOpen ? (
                  <img
                    src={require("../../../assets/images/invest/down-arrow.png")}
                    alt="logo"
                  />
                ) : (
                  <img
                    src={require("../../../assets/images/invest/bottom-arrow.png")}
                    alt="logo"
                  />
                )}
              </span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <tr className={styles.collapse}>
                <td colspan="8">
                  <div className={styles.customCollpase}>
                    <div className={styles.userList}>
                      <ul>
                        <li
                          onClick={() => handleInvestDetails("loan")}
                          className={currentDetails === "loan" && styles.active}
                        >
                          <label>Loan Detail</label>
                        </li>
                        <li
                          onClick={() => handleInvestDetails("personal")}
                          className={
                            currentDetails === "personal" && styles.active
                          }
                        >
                          <label> Personal Detail</label>
                        </li>
                        <li
                          onClick={() => handleInvestDetails("professional")}
                          className={
                            currentDetails === "professional" && styles.active
                          }
                        >
                          <label>Professional Detail</label>
                        </li>
                        <li
                          onClick={() => handleInvestDetails("credit")}
                          className={
                            currentDetails === "credit" && styles.active
                          }
                        >
                          <label>Credit Detail</label>
                        </li>
                        <li
                          onClick={() => handleInvestDetails("dlinquency")}
                          className={
                            currentDetails === "dlinquency" && styles.active
                          }
                        >
                          <label>Delinquency & Default</label>
                        </li>
                      </ul>
                    </div>
                    {currentDetails === "loan" && (
                      <div className={styles.userDetail}>
                        <ul className={styles.userDetailList1}>
                          <li>
                            <label>Loan Type</label>
                            <span>
                              {props.userLoan.type !== null
                                ? props.userLoan.type
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>No of Lenders</label>
                            <span>
                              {props.userLoan.number_of_lenders !== null
                                ? props.userLoan.number_of_lenders
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>EMI Amount</label>
                            <span>
                              {props.userLoan.emi !== null
                                ? props.userLoan.emi
                                : "-"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                    {currentDetails === "personal" && (
                      <div
                        className={`${styles.userDetail} ${styles.customWidth}`}
                      >
                        <ul className={styles.userDetailList1}>
                          <li>
                            <label>Gender</label>
                            <span>{props.gender}</span>
                          </li>
                          <li>
                            <label>Age</label>
                            <span>{props.age}</span>
                          </li>
                          <li>
                            <label>Qualification</label>
                            <span>
                              {user_info.qualification !== null
                                ? user_info.qualification
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>Total Family Members</label>
                            <span>
                              {user_info.total_family_members
                                ? user_info.total_family_members
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>Stay Type</label>
                            <span>
                              {address && address.stay_type
                                ? address.stay_type
                                : ""}
                            </span>
                          </li>
                        </ul>
                        <span className={styles.line}></span>
                        <ul className={styles.userDetailList2}>
                          <li>
                            <label>Maritial Status</label>
                            <span>{props.maritalStatus}</span>
                          </li>
                          <li>
                            <label>City</label>
                            <span>
                              {address && address.city ? address.city : ""}
                            </span>
                          </li>
                          <li>
                            <label>Specialization</label>
                            <span>{!user_info.specialization && "-"}</span>
                          </li>
                          <li>
                            <label>Earning Family Members</label>
                            <span>
                              {!user_info.earning_family_members && "-"}
                            </span>
                          </li>
                          <li>
                            <label>Monthly Income</label>
                            <span>{props.income} </span>
                          </li>
                          <li>
                            <label>Current EMI</label>
                            <span>{props.userLoan.emi}</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    {currentDetails === "professional" && (
                      <div className={styles.userDetail}>
                        <ul className={styles.userDetailList1}>
                          <li>
                            <label>Employer Name</label>
                            <span>{user_info.employer_name}</span>
                          </li>
                          <li>
                            <label>Designation</label>
                            <span>{user_info.designation}</span>
                          </li>
                          <li>
                            <label>Working Since</label>
                            <span>{user_info.total_work_experience}</span>
                          </li>
                          <li>
                            <label>Total Experience</label>
                            <span>{user_info.total_work_experience}</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    {currentDetails === "credit" && (
                      <div className={styles.userDetail}>
                        <ul className={styles.userDetailList1}>
                          <li>
                            <label>Total Number of Credit Card</label>
                            <span>{credit_details.number_of_credit_cards}</span>
                          </li>
                          <li>
                            <label>Total Credit Card Limit</label>
                            <span>
                              {credit_details.sum_of_all_credit_card_limits}
                            </span>
                          </li>
                          <li>
                            <label>First Loan Availment Date</label>
                            <span>
                              {credit_details.first_loan_availment_date}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                    {currentDetails === "dlinquency" && (
                      <div className={styles.userDetail}>
                        <ul className={styles.userDetailList1}>
                          <li>
                            <label>Current Deliquency Amount</label>
                            <span>
                              {credit_details.current_delinquency !== null
                                ? credit_details.current_delinquency
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>Month Since Last Deliquency</label>
                            <span>
                              {credit_details.months_since_last_delinquency !==
                              null
                                ? credit_details.months_since_last_delinquency
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>Bank Defaulter</label>
                            <span>
                              {credit_details.bank_defaulter !== null
                                ? credit_details.bank_defaulter
                                : "-"}
                            </span>
                          </li>
                          <li>
                            <label>Last Default Date</label>
                            <span>
                              {credit_details.default_date !== null
                                ? credit_details.default_date
                                : "-"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}

                    <div className={styles.userGraph}>
                      <div className={styles.userGraphImg}>
                        <PieChart
                          animate={false}
                          animationDuration={500}
                          animationEasing="ease-out"
                          cx={50}
                          cy={100}
                          data={[
                            {
                              color: "#F4F4F4",
                              title: "One",
                              value: 600
                            },
                            {
                              color: "#E7F7FF",
                              title: "Two",
                              value: credit_details.credit_score
                            },
                            {
                              color: "#F4F4F4",
                              title: "Three",
                              value: 200
                            }
                          ]}
                          label={true}
                          labelPosition={102}
                          labelStyle={{
                            fontFamily: "sans-serif",
                            fontSize: "5px",
                            fill: "#000"
                          }}
                          lengthAngle={180}
                          lineWidth={100}
                          onClick={undefined}
                          onMouseOut={undefined}
                          onMouseOver={undefined}
                          paddingAngle={0}
                          radius={50}
                          background="#F4F4F4"
                          rounded={false}
                          startAngle={180}
                          viewBoxSize={[100, 70]}
                        />
                        <p>Credit Bureau Score</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </td>
      </tr>
    </>
  );
};

export default InvestRow;
