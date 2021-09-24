import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import * as Toastr from "toastr";

import "./sign-in.scss";

import {
  USER_AS_INDIVIDUAL,
  USER_AS_INSTITUTIONAL
} from "../../../common/application-constants";

import { verifyProspect } from "../../../api-integrations/modules/authentication";
import { setSignedUserDetails } from "../../../api-integrations/common/local-storage";

const SignUp = props => {
  let history = useHistory();

  const [fullName, setFullName] = useState("");
  const [fullNameRequired, setFullNameRequired] = useState("");
  const [isRequiredNumber, setIsRequiredNumber] = useState(false);
  const [isvalidNumber, setIsvalidNumber] = useState(false);
  const [isvalidEmail, setIsvalidEmail] = useState(false);
  const [isRequiredEmail, setIsRequiredEmail] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [whetherUserInstitutional, setWhetherUserInstitutional] = useState(
    false
  );
  const [referralCode, setReferralCode] = useState("");
  const [referralDisplay, setReferralDisplay] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getUrlParams();
  }, []);

  const getUrlParams = () => {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
      m,
      key,
      value
    ) {
      if (key == "referralCode") {
        setReferralCode(value);
      }

      if (key == "referralDisplay") {
        setReferralDisplay(value);
      }

      if (key == "name") {
        setName(value);
      }
    });
  };

  const validateMobileNumber = () => {
    var proceedWithMobileNumber = true;

    if (mobileNumber == "") {
      proceedWithMobileNumber = false;
      setIsRequiredNumber(true);
    } else {
      setIsRequiredNumber(false);
    }

    if (mobileNumber.length != 10) {
      proceedWithMobileNumber = false;
      setIsvalidNumber(true);
    } else {
      setIsvalidNumber(false);
    }
    return proceedWithMobileNumber;
  };

  const validateEmail = () => {
    var validEmail = /\S+@\S+\.\S+/.test(email);
    var proceedWithEmail = true;

    if (email == "") {
      proceedWithEmail = false;
      setIsRequiredEmail(true);
    } else {
      setIsRequiredEmail(false);
    }

    if (validEmail) {
      setIsvalidEmail(false);
    } else {
      proceedWithEmail = false;
      setIsvalidEmail(true);
    }
    return proceedWithEmail;
  };

  const validateFullName = () => {
    var proceedWithFullName = true;
    if (fullName.length <= 0) {
      proceedWithFullName = false;
      setFullNameRequired(true);
    } else {
      setFullNameRequired(false);
    }

    return proceedWithFullName;
  };

  const clearFormInputName = () => {
    setFullName("");
  };

  const clearFormInputEmail = () => {
    setEmail("");
  };

  const triggerSignUp = () => {
    if (validateFullName() && validateEmail() && validateMobileNumber()) {
      const userType = whetherUserInstitutional
        ? USER_AS_INSTITUTIONAL
        : USER_AS_INDIVIDUAL;

      var prospectDetails = {
        first_name: fullName,
        mobile_number: mobileNumber,
        email: email
      };

      verifyProspect(prospectDetails).then(prospectStatus => {
        if (prospectStatus != undefined) {
          Toastr.success(prospectStatus, "OTP Status");
          setSignedUserDetails({
            first_name: fullName,
            mobile_number: mobileNumber,
            email: email,
            type: userType
          });

          history.push({
            pathname: "/mobileverification"
          });
        }
      });
    }
  };

  return (
    <div>
      <div className="sign-in-page">
        <div className="mobile-image">
          <div className="mobile-img">
            <img
              src={require("../../../assets/images/sign-in-page/mobile.png")}
            />
          </div>
        </div>

        <div className="login">
          <div className="custom-form">
            <div className="icon-image">
              <img
                src={require("../../../assets/images/sign-in-page/lenden.png")}
              />
            </div>
            <h1>Create Account</h1>

            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="Full Name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                name="full_name"
                onChange={e => {
                  setFullName(e.target.value);
                }}
                error={fullNameRequired}
                helperText={fullNameRequired && "Please enter a name"}
                value={fullName}
                autoComplete="off"
              />
              {fullName <= 0 ? null : (
                <span onClick={clearFormInputName}>
                  <img
                    src={require("../../../assets/images/mobile-verification/wrong.png")}
                  />
                </span>
              )}
            </div>
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="Email Id"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                name="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                error={isRequiredEmail || isvalidEmail}
                helperText={
                  (isRequiredEmail && "Please enter a email") ||
                  (isvalidEmail && "Please enter a valid email")
                }
                value={email}
                autoComplete="off"
              />
              {email <= 0 ? null : (
                <span onClick={clearFormInputEmail}>
                  <img
                    src={require("../../../assets/images/mobile-verification/wrong.png")}
                  />
                </span>
              )}
            </div>
            <div className="custom-input">
              <TextField
                type="number"
                id="standard-full-width"
                placeholder="Mobile Number"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                name="mobile_number"
                onChange={e => {
                  setMobileNumber(e.target.value);
                }}
                error={isRequiredNumber || isvalidNumber}
                helperText={
                  (isRequiredNumber && "Please enter a mobile number") ||
                  (isvalidNumber && "Please enter a valid mobile number")
                }
                onInput={e => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                value={mobileNumber}
                autoComplete="off"
              />
              <div className="custom-notes">
                <h3>We will send an OTP to verify this number.</h3>
              </div>
            </div>

            <div className="custom-input">
              <label>Institutional Investor ?</label>
              <span className="check-box">
                <div className="white-checkbox-sec">
                  <label class="container">
                    <input
                      readOnly
                      type="checkbox"
                      onClick={() => {
                        setWhetherUserInstitutional(!whetherUserInstitutional);
                      }}
                      checked={whetherUserInstitutional}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </span>
              <div className="custom-notes">
                <h3>Enable this if you are an institutional investor.</h3>
              </div>
            </div>
            <div className="verification-btn ">
              <button
                onClick={() => {
                  triggerSignUp();
                }}
                className="green-btn sign-btn"
              >
                Send OTP
              </button>
              <div className="sign-in-link">
                <Link to="/signin">Login</Link>
              </div>
            </div>
            {(() => {
              if (referralCode != "") {
                return (
                  <div className="referal">
                    <h3> Your referral has been applied.</h3>
                    <label>{referralCode}</label>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
