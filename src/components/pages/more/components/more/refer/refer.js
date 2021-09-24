import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";

import "./refer.scss";

import * as Toastr from "toastr";

import { getUserDetails } from "../../../../../../api-integrations/modules/landing-apis";
import { referAndEarn } from "../../../../../../api-integrations/modules/personal-details";
import { getFireBaseReferralLink } from "../../../../../../api-integrations/common/connect";

const Refer = () => {
  const [referralMobileNumber, setReferralMobileNumber] = useState("");
  const [
    referralMobileNumberRequired,
    setReferralMobileNumberRequired
  ] = useState("");
  const [referralMobileNumberValid, setReferralMobileNumberValid] = useState(
    ""
  );
  const [userDetails, setUserDetails] = useState({});
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    getUserDetails().then(userDetails => {
      if (userDetails != undefined) {
        var user = userDetails.user;
        setUserDetails(user);
        setReferralCode(`LDC${user.id}`);
      }
    });
  };

  const validateMobileNumber = () => {
    var proceedReferral = true;
    if (referralMobileNumber == "") {
      proceedReferral = false;
      setReferralMobileNumberRequired(true);
    } else {
      setReferralMobileNumberRequired(false);
    }

    if (referralMobileNumber.length != 10) {
      proceedReferral = false;
      setReferralMobileNumberValid(true);
    } else {
      setReferralMobileNumberValid(false);
    }

    return proceedReferral;
  };

  const triggerReferAndEarn = () => {
    if (validateMobileNumber()) {
      getFireBaseReferralLink(referralCode).then(referralLink => {
        let referDetails = {
          type: "mobile",
          email: [],
          mobile_number: [referralMobileNumber],
          referral_url: referralLink
        };

        referAndEarn(referDetails).then(response => {
          if (response != undefined) {
            Toastr.success("Invited Successfully", "Invitation Status");
          }
        });
      });
    }
  };

  return (
    <div className="refer-card">
      <div className="refer-card-sec">
        <div className="refer-card-img">
          <img
            src={require("../../../../../../assets/images/more/bell1.png")}
            alt="img"
          />
        </div>
        <p>Refer and Earn</p>
      </div>
      <div className="refer-card-middle">
        <div className="mobile-input">
          <TextField
            id="standard-full-width"
            placeholder="enter mobile number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            type="number"
            error={referralMobileNumberRequired || referralMobileNumberValid}
            helperText={
              (referralMobileNumberRequired &&
                "Please enter a mobile number") ||
              (referralMobileNumberValid &&
                "Please enter a valid mobile number")
            }
            onChange={e => {
              setReferralMobileNumber(e.target.value);
            }}
            onInput={e => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10);
            }}
            value={referralMobileNumber}
            autoComplete="off"
          />
        </div>
        <div className="invite-btn">
          <a
            onClick={() => {
              triggerReferAndEarn();
            }}
            className="pink-btn"
          >
            Send Invitation
          </a>
        </div>
      </div>
      <p>Let a friend know and earn a referral bonus</p>
    </div>
  );
};

export default Refer;
