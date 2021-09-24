import React from "react";
import "./account_balance.scss";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const AccountBalance = props => {
  const accountBalance = props.accountBalance;
  const UPI = props.upi;
  const lowBalanceAlert = props.lowBalanceAlert;

  return (
    <div className="account-balance">
      <div className="dashboard-secondary-heading">
        <h1>Account Balance</h1>
        <span></span>
      </div>
      {lowBalanceAlert ? (
        <label className={`low-balance ${accountBalance > 2000 && "hide"}`}>
          Low Balance
        </label>
      ) : null}

      <div className="account-balance-amount">
        <span>&#8377;</span>
        <label>{accountBalance == undefined ? "" : accountBalance}</label>
      </div>
      {UPI && (
        <FormControl fullWidth className="">
          <Input
            id="standard-adornment-amount"
            // value=""
            // onChange=""
            placeholder="add amount"
            startAdornment={
              <InputAdornment position="start">&#8377;</InputAdornment>
            }
          />
        </FormControl>
      )}
      {UPI ? (
        <div className="btn-wrapper">
          <a className="blue-button">Add</a>
        </div>
      ) : (
        <div className="btn-wrapper">
          <a className="blue-button">Manual Fund Details</a>
        </div>
      )}
    </div>
  );
};

export default AccountBalance;
