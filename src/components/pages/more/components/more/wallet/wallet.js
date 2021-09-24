import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./wallet.scss";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
const Refer = ({ accountBalance, bankDetails, lowBalanceAlert }) => {
  let history = useHistory();

  const walletClickHandle = () => {
    history.push({
      pathname: "/wallet",
      state: { bankDetails: bankDetails, accountBalance: accountBalance }
    });
  };

  return (
    <div className="wallet-card">
      <div className="wallet-card-head">
        <h2 onClick={walletClickHandle}>Wallet</h2>

        {lowBalanceAlert ? <a className="white-btn">Low Balance</a> : null}
      </div>
      <div className="wallet-card-middle">
        <h2>Available Fund</h2>
        <label>
          <span>
            <img
              src={require("../../../../../../assets/images/more/ruppe.png")}
              alt="img"
            />
          </span>
          {accountBalance}
        </label>
      </div>
      <div className="wallet-card-bottom">
        <FormControl fullWidth className="custom-input">
          <Input
            id="standard-adornment-amount"
            placeholder="add amount"
            startAdornment={
              <InputAdornment position="start">&#8377;</InputAdornment>
            }
          />
        </FormControl>
        {/* <span>
          <img
            src={require('../../../../../../assets/images/lenden/rupe.png')}
            alt='img'
          />
        </span> */}
        {/* <div className='custom-input'>
          <TextField
            id='standard-full-width'
            placeholder='add amount'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
            autoComplete="off"
          />
        </div> */}
        <a className="blue-btn">ADD</a>
      </div>
    </div>
  );
};

export default Refer;
