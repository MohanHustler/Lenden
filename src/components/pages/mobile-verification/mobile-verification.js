import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Countdown from "react-countdown";

import TextField from "@material-ui/core/TextField";

import * as Toastr from "toastr";

import "./mobile-verification.scss";

import {
  REQUEST_PURPOSE_SIGN_UP,
  USER_DEVICE_WEB
} from "../../../common/application-constants";

import {
  verifyProspectAndSignUp,
  verifyProspect
} from "../../../api-integrations/modules/authentication";
import {
  getUserFirstName,
  getUserMobileNumber,
  getUserEmail,
  getUserType
} from "../../../api-integrations/common/local-storage";

const MobileVerification = () => {
  let history = useHistory();

  const userFullName = getUserFirstName();
  const userMobileNumber = getUserMobileNumber();
  const userEmail = getUserEmail();
  const userType = getUserType();

  const [mobileOtp, setMobileOtp] = useState("");

  const [mobileOtpRequired, setMobileOtpRequired] = useState("");
  const [mobileOtpValid, setMobileOtpValid] = useState("");

  const validateOTP = () => {
    var proceedWithOTP = true;

    if (mobileOtp == "") {
      proceedWithOTP = false;
      setMobileOtpRequired(true);
    } else {
      setMobileOtpRequired(false);
    }

    if (mobileOtp.length != 6) {
      proceedWithOTP = false;
      setMobileOtpValid(true);
    } else {
      setMobileOtpValid(false);
    }

    return proceedWithOTP;
  };

  const requestOtp = () => {
    var prospectDetails = {
      first_name: userFullName,
      mobile_number: userMobileNumber,
      email: userEmail
    };

    verifyProspect(prospectDetails).then(prospectStatus => {
      if (prospectStatus != undefined) {
        Toastr.success(prospectStatus, "OTP Status");
      }
    });
  };

  const [resend, setResend] = useState(false);

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      setResend(true);
      return 0;
    } else {
      return <span>{seconds}</span>;
    }
  };

  const verifyOtp = () => {
    if (validateOTP()) {
      var prospectDetails = {
        full_name: userFullName,
        mobile_number: userMobileNumber,
        email: userEmail,
        key: mobileOtp,
        purpose: REQUEST_PURPOSE_SIGN_UP,
        type: userType,
        user_source: USER_DEVICE_WEB
      };

      verifyProspectAndSignUp(prospectDetails).then(response => {
        if (response != undefined) {
          Toastr.success(
            "Mobile number verified successfully",
            "Mobile Verification Status"
          );
          history.push("/iddetail");
        }
      });
    }
  };

  return (
    <div>
      <div className="mobile-verification">
        <div className="mobile-image">
          <div className="mobile-img">
            <img
              src={require("../../../assets/images/mobile-verification/mobile_verification.png")}
            />
          </div>
        </div>
        <div className="verification">
          <div className="custom-form">
            <div className="verfication-text">
              <h1>Mobile Verification</h1>
              <h2>Hey {userFullName} , we are happy to see you here.</h2>
              <p>
                Please enter the OTP send to your phone. It help us verify your
                number. It also help us keep your account safe.
              </p>
            </div>
            <div className="custom-input mgb">
              <TextField
                type="number"
                id="standard-full-width"
                placeholder="Enter the 6 digit OTP"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => {
                  setMobileOtp(e.target.value);
                }}
                value={mobileOtp}
                autoComplete="off"
                error={mobileOtpRequired || mobileOtpValid}
                helperText={
                  (mobileOtpRequired && "Please enter a OTP") ||
                  (mobileOtpValid && "Please enter a valid OTP")
                }
                onInput={e => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
              <span className="send-text">
                <span
                  className={`resend-otp ${!resend && "hide"}`}
                  onClick={() => {
                    requestOtp();
                  }}
                >
                  Resend OTP
                </span>
              </span>
            </div>
            <div className="custom-notes">
              <h3>
                Havent received an otp yet?{" "}
                <span className={`${resend && "hide"}`}>
                  Please wait for&nbsp;
                  <Countdown date={Date.now() + 30000} renderer={renderer} />s
                </span>
              </h3>
            </div>
            <div className="verification-btn">
              <button
                className=" green-btn"
                onClick={() => {
                  verifyOtp();
                }}
              >
                Verify Number
              </button>
            </div>
          </div>
          <div className="verify-notes">
            <h4>
              By continuing you agree to
              <span>
                <a
                  className="link"
                  href="https://www.lendenclub.com/Terms-of-services"
                  target="_black"
                >
                  T&C
                </a>
              </span>
              of LenDenClub
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileVerification;
