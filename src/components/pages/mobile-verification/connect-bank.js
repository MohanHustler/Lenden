import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import * as Toastr from "toastr";

import "./mobile-verification.scss";

import Loader from "../../common/loader";

import {
  addBankDetails,
  getBankInfo,
  getBankDetails
} from "../../../api-integrations/modules/personal-details";
const ConnectBank = () => {
  let history = useHistory();

  const accountTypeSelectStyles = makeStyles(theme => ({
    root: {
      height: "2rem !important"
    }
  }));
  const accountTypeSelect = accountTypeSelectStyles();

  const accountTypeItemStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "#fff !important"
    }
  }));
  const aacountTypeItem = accountTypeItemStyles();

  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchAddress, setBankBranchAddress] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");

  const [ifscCodeRequiredError, setIfscCodeRequiredError] = useState(false);
  const [ifscCodeValidError, setIfscCodeValidError] = useState(false);
  const [accountTypeError, setAccountTypeError] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [accountHolderNameError, setAccountHolderNameError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBankDetails();
  }, []);

  const validateBankDetails = () => {
    var proceedSavingBankDetails = true;
    if (accountNumber == "") {
      proceedSavingBankDetails = false;
      setAccountNumberError(true);
    } else {
      setAccountNumberError(false);
    }

    if (ifscCode == "") {
      proceedSavingBankDetails = false;
      setIfscCodeRequiredError(true);
    } else {
      setIfscCodeRequiredError(false);
    }

    if (ifscCode.length != 11) {
      proceedSavingBankDetails = false;
      setIfscCodeValidError(true);
    } else {
      setIfscCodeValidError(false);
    }

    if (accountHolderName == "") {
      proceedSavingBankDetails = false;
      setAccountHolderNameError(true);
    } else {
      setAccountHolderNameError(false);
    }

    return proceedSavingBankDetails;
  };

  const fetchBankDetails = () => {
    getBankDetails().then(response => {
      setLoading(false);
      if (response != undefined && response.custom_user_bank_account_data) {
        var bankDetails = response.custom_user_bank_account_data;
        setAccountNumber(bankDetails.number);
        setConfirmAccountNumber(bankDetails.number);
        setBankName(bankDetails.bank.name);
        setIfscCode(bankDetails.ifsc_code);
        setAccountType(bankDetails.type);
        setAccountHolderName(bankDetails.name);
        fetchBankInfo(bankDetails.ifsc_code);
      }
    });
  };

  const updateBankDetails = () => {
    let bankDetails = {
      number: accountNumber,
      ifsc_code: ifscCode,
      type: accountType,
      name: accountHolderName,
      bank_name: bankName
    };

    if (validateBankDetails()) {
      addBankDetails(bankDetails).then(response => {
        if (response != undefined) {
          Toastr.success("Data Saved Successfully", "Bank Details Status");
          history.push("/dashboard");
        }
      });
    }
  };

  const fetchBankInfo = ifscCode => {
    getBankInfo({ ifsc_code: ifscCode }).then(bankDetails => {
      if (bankDetails != undefined) {
        setLoading(false);
        setBankName(bankDetails.BANK);
        setBankBranchName(bankDetails.BRANCH);
        setBankBranchAddress(bankDetails.ADDRESS);
      }
    });
  };

  return (
    <div>
      <div>
        {(() => {
          if (loading) {
            return <Loader />;
          }
        })()}
      </div>
      <div className="mobile-verification">
        <div className="mobile-image">
          <div className="mobile-img">
            <img
              src={require("../../../assets/images/mobile-verification/connect_bank.png")}
            />
          </div>
        </div>
        <div className="verification">
          <div className="verfication-text confirm">
            <h1>Connect Bank</h1>
            <h2>Add bank details to withdraw funds</h2>
          </div>
          <div className="custom-form">
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="Account holder name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                error={accountHolderNameError}
                helperText={
                  accountHolderNameError && "Please enter account holder name"
                }
                onChange={e => {
                  setAccountHolderName(e.target.value);
                }}
                value={accountHolderName}
                autoComplete="off"
              />
            </div>
            <div className="custom-input">
              <TextField
                type="password"
                id="standard-full-width"
                placeholder="Bank a/c number"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                error={accountNumberError}
                helperText={accountNumberError && "Please enter account number"}
                onChange={e => {
                  setAccountNumber(e.target.value);
                }}
                value={accountNumber}
                autoComplete="off"
              />
            </div>
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="Confirm bank a/c number"
                fullWidth
                error={accountNumber != confirmAccountNumber ? true : false}
                helperText={
                  accountNumber != confirmAccountNumber
                    ? "Account number doesn't match"
                    : ""
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => {
                  setConfirmAccountNumber(e.target.value);
                }}
                value={confirmAccountNumber}
                autoComplete="off"
              />
            </div>
            <div className="custom-input">
              <Select
                className={accountTypeSelect.root}
                labelId="account-type-label"
                id="standard-full-width"
                value={accountType}
                onChange={e => {
                  setAccountType(e.target.value);
                }}
              >
                <MenuItem className={aacountTypeItem.root} value={"SAVINGS"}>
                  Savings
                </MenuItem>
                <MenuItem className={aacountTypeItem.root} value={"CURRENT"}>
                  Current
                </MenuItem>
              </Select>
            </div>
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="IFSC Code"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                error={ifscCodeRequiredError || ifscCodeValidError}
                helperText={
                  (ifscCodeRequiredError && "Please IFSC code") ||
                  (ifscCodeValidError && "Please enter valid IFSC code")
                }
                onChange={e => {
                  setIfscCode(e.target.value);
                  if (e.target.value == "") {
                    setBankName("");
                    setBankBranchName("");
                    setBankBranchAddress("");
                  }

                  if (e.target.value.length == 11) {
                    setLoading(true);
                    fetchBankInfo(e.target.value);
                  }
                }}
                value={ifscCode}
                autoComplete="off"
              />
            </div>
            <div className="custom-label">
              <label>{`Bank Name: `}</label>
              <span>{bankName || "(Fill IFSC)"}</span>
            </div>
            <div className="custom-label">
              <label>{`Branch Name: `}</label>
              <span>{bankBranchName || "(Fill IFSC)"}</span>
            </div>
            <div className="custom-label">
              <label>{`Branch Address: `}</label>
              <span>{bankBranchAddress || "(Fill IFSC)"}</span>
            </div>
            <div className="verification-btn">
              <button
                onClick={() => {
                  updateBankDetails();
                }}
                className=" green-btn"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConnectBank;
