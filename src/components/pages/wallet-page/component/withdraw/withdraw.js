import React from "react";
import TextField from "@material-ui/core/TextField";
import "./withdraw-account.scss";

const Withdraw = () => {
  return (
    <div className="withdraw-card">
      <div className="withdraw-card-head">
        <h2>Withdraw Fund</h2>
        <p>How much do you wish to withdraw ?</p>
        <p>
          Once the withdraw request is placed, it may take 24 to 48 hours to
          credit the amount to your bank account
        </p>
      </div>
      <div className="withdraw-card-bottom">
        <div className="custom-input">
          <TextField
            id="standard-full-width"
            placeholder="₹ add amount"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            autoComplete="off"
          />
        </div>
        <a className="blue-btn">withdraw</a>
      </div>
      <div className="withdraw-card-head">
        <span>
          Requested amount will be credited to registered account with account
          number ************2345
        </span>
      </div>
    </div>
  );
};

export default Withdraw;
