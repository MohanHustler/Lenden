import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Countdown from "react-countdown";

import TextField from "@material-ui/core/TextField";

import * as Toastr from "toastr";

import "./sign-in.scss";

import {
  verifyOtpAndLogin,
  sendOtpForLogin
} from "../../../api-integrations/modules/authentication";

const SignIn = props => {
  let history = useHistory();

  const [mobileNumber, setMobileNumber] = useState("");
  const [isRequiredNumber, setIsRequiredNumber] = useState(false);
  const [isvalidNumber, setIsvalidNumber] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);

  const validateMobileNumber = () => {
    var proceedOTP = true;

    if (mobileNumber == "") {
      proceedOTP = false;
      setIsRequiredNumber(true);
    } else {
      setIsRequiredNumber(false);
    }

    if (mobileNumber.length != 10) {
      proceedOTP = false;
      setIsvalidNumber(true);
    } else {
      setIsvalidNumber(false);
    }
    return proceedOTP;
  };

  const [resend, setResend] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [resendOtpBtn, setResendOtpBtn] = useState(false);

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      setResendOtp(true);
      setResend(false);

      return 0;
    } else {
      return <span>{seconds}s</span>;
    }
  };

  const requestOtp = () => {
    let mobileDetails = {
      mobile_number: mobileNumber
    };

    if (validateMobileNumber()) {
      setResend(true);
      setResendOtp(false);
      setResendOtpBtn(true);

      sendOtpForLogin(mobileDetails).then(otpStatus => {
        if (otpStatus != undefined) {
          Toastr.success(otpStatus, "OTP Status");
          setSendOtp(true);
        } else {
          setResendOtp(true);
          setResend(false);
        }
      });
    }
  };

  const triggerLogin = () => {
    if (validateMobileNumber()) {
      let signInDetails = {
        mobile_number: mobileNumber,
        key: otp
      };

      verifyOtpAndLogin(signInDetails).then(response => {
        if (response != undefined) {
          Toastr.success("Logged in successfully", "Login Status");
          history.push("/dashboard");
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
            <h1>Login</h1>
            <div className="custom-input">
              <TextField
                type="number"
                id="standard-full-width"
                placeholder="Mobile Number"
                fullWidth
                margin="normal"
                error={isRequiredNumber || isvalidNumber}
                helperText={
                  (isRequiredNumber && "Please enter a mobile number") ||
                  (isvalidNumber && "Please enter a valid mobile number")
                }
                name="mobile_number"
                onChange={e => {
                  setMobileNumber(e.target.value);
                }}
                onInput={e => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                value={mobileNumber}
                autoComplete="off"
              />
            </div>

            <div className="custom-input">
              <TextField
                disabled={!sendOtp}
                type="number"
                id="standard-full-width"
                placeholder="OTP"
                fullWidth
                margin="normal"
                name="otp"
                onChange={e => {
                  setOtp(e.target.value);
                }}
                onInput={e => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
                value={otp}
                autoComplete="off"
              />
              <div className="custom-notes">
                <h3 className={`${!resend && "hide"}`}>
                  Please wait for
                  <span className="counttime">
                    <Countdown date={Date.now() + 30000} renderer={renderer} />
                  </span>
                </h3>
              </div>
              <span className="send-text">
                <span
                  className={`${!resendOtp && "hide"}`}
                  onClick={() => {
                    requestOtp();
                  }}
                >
                  Resend OTP{" "}
                </span>
              </span>
              <span className="send-text">
                <span
                  className={`${resendOtpBtn && "hide"}`}
                  onClick={() => {
                    requestOtp();
                  }}
                >
                  Send OTP
                </span>
              </span>
            </div>
            <div className="verification-btn">
              <button
                onClick={() => {
                  triggerLogin();
                }}
                className="green-btn"
              >
                Login
              </button>
            </div>
            <div className="signup-link">
              <span>
                <Link to="/signup">Signup</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
