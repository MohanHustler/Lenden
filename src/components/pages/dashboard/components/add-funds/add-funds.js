import React from "react";

import "./add-funds.scss";

const AddFunds = props => {
  const bankDetails = props.addFundBankDetails[0];

  return (
    <div>
      <div className="add-funds">
        <div className="add-funds-header">
          <h1>Add Funds</h1>
          <span
            onClick={() => {
              props.handleCloseFund();
            }}
          >
            <img
              src={require("../../../../../assets/images/close-component.png")}
            />
          </span>
        </div>
        <div className="register-details">
          <p>
            Register the following bank account as a beneficiary in your account
            and transfer funds through NEFT/IMPS/RTGS
          </p>
          <div className="accounts-details">
            <ul>
              <li>
                <label>Account Number</label>
                <span>{bankDetails.number || "-"}</span>
              </li>
              <li>
                <label>IFSC Code</label>
                <span>{bankDetails.ifsc_code || "-"}</span>
              </li>
              <li>
                <label>Account Name</label>
                <span>{bankDetails.name || "-"}</span>
              </li>
              <li>
                <label>Account Type</label>
                <span>{bankDetails.type || "-"}</span>
              </li>
              <li>
                <label>Bank Name</label>
                <span>{bankDetails.bank__name || "-"}</span>
              </li>
              <li>
                <label>Branch</label>
                <span>{bankDetails.branch__name || "-"}</span>
              </li>
            </ul>
          </div>
          <div className="contents">
            <p>
              Once you transfer funds to above mentioned bank account, it may
              take upto 4hours for a NEFT/RTGS transaction, and upto 45 minutes
              for an IMPS transaction to reflect in your LenDen account.
            </p>
            <p>
              * If you are using ICICI bank to add benecficiary, please select
              <label>“other bank payee”</label> option.
            </p>
          </div>
        </div>
        <div className="notes">
          <p>
            <label> NOTE : </label>We strongly recommend adding above
            beneficiary by logging in to your bank’s website/web-portal. Your
            bank’s mobile app may not support addition of new beneficiary with
            alpha numeric account number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
