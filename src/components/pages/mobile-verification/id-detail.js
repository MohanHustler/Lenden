import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import * as Toastr from "toastr";

import "./mobile-verification.scss";
import "toastr/build/toastr.css";

import moment from "moment";

import Loader from "../../common/loader";

import {
  addPanDetails,
  getPanDetails
} from "../../../api-integrations/modules/personal-details";
import { getTaskId } from "../../../api-integrations/common/local-storage";

import { getProfileDetails } from "../../../api-integrations/modules/landing-apis";

const IdDetail = () => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [invalidPanNumber, setInvalidPanNumber] = useState(false);
  const [dob, setDob] = useState("");
  const [invalidDob, setInvalidDob] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [userName, setUserName] = useState("");

  const [panNumberRequired, setPanNumberRequired] = useState(false);
  const [panNumberValid, setPanNumberValid] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPanDetails().then(panDetails => {
      setLoading(false);
      if (panDetails != undefined) {
        setPanNumber(panDetails.pan_no);
        setDob(panDetails.dob);
      }
    });

    getProfileDetails().then(responseUserDetails => {
      if (
        responseUserDetails &&
        responseUserDetails.personal_details != undefined
      ) {
        setUserName(responseUserDetails.personal_details.full_name);
      }
    });
  }, []);

  const validatePAN = () => {
    var proceedWithPan = true;

    if (panNumber == "") {
      proceedWithPan = false;
      setPanNumberRequired(true);
    } else {
      setPanNumberRequired(false);
    }

    if (panNumber.length === 10) {
      setPanNumberValid(false);
    } else {
      proceedWithPan = false;
      setPanNumberValid(true);
    }

    return proceedWithPan;
  };

  const validateUserAge = () => {
    var proceedWithAge = true;

    var userDob = moment(dob, "DD/MM/YYYY", true);
    if (userDob.isValid()) {
      setInvalidDob(false);
      var today = moment(new Date(), "DD/MM/YYYY");

      if (today.diff(userDob, "years") >= 18) {
        setIsAdult(false);
      } else {
        proceedWithAge = false;
        setIsAdult(true);
      }
    } else {
      proceedWithAge = false;
      setInvalidDob(true);
    }

    return proceedWithAge;
  };

  const updatePanAndDob = () => {
    if (validatePAN() && validateUserAge()) {
      const pancardDetails = {
        pan: panNumber,
        dob: dob
      };
      const userTaskIdParam = {
        task_id: getTaskId()
      };

      addPanDetails(pancardDetails, userTaskIdParam).then(response => {
        if (response != undefined) {
          Toastr.success("Data Saved Successfully", "Id Details Status");
          history.push("/accountopeningfee");
        }
      });
    }
  };

  const resetPanNumber = () => {
    setPanNumber("");
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        <div className="mobile-verification">
          <div className="mobile-image">
            <div className="mobile-img">
              <img
                src={require("../../../assets/images/mobile-verification/id-details.png")}
              />
            </div>
          </div>
          <div className="verification">
            <div className="custom-form">
              <div className="verfication-text">
                <h1>ID Detail</h1>
                <h2>
                  {`Nicely done ${userName}. Your mobile number is now verified.`}
                </h2>
                <p>
                  We will need some more details before we move forward. These
                  KYC details are important before you start investing.
                </p>
              </div>

              <div className="custom-input">
                <TextField
                  id="standard-full-width"
                  placeholder="PAN Number"
                  fullWidth
                  margin="normal"
                  error={invalidPanNumber}
                  helperText={
                    invalidPanNumber
                      ? "Please enter proper PAN card number"
                      : ""
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={panNumberRequired || panNumberValid}
                  helperText={
                    (panNumberRequired && "Please enter a PAN number") ||
                    (panNumberValid && "Please enter a valid PAN number")
                  }
                  onChange={e => {
                    setPanNumber(e.target.value);
                  }}
                  value={panNumber}
                  autoComplete="off"
                />
                {panNumber.length !== 0 && (
                  <span
                    onClick={() => {
                      resetPanNumber();
                    }}
                  >
                    <img
                      src={require("../../../assets/images/mobile-verification/wrong.png")}
                    />
                  </span>
                )}
              </div>
              <div className="custom-input">
                <TextField
                  id="full-width"
                  placeholder="DD/MM/YYYY"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => {
                    setDob(e.target.value);
                  }}
                  error={invalidDob || isAdult}
                  helperText={
                    (invalidDob && "Please enter a valid date") ||
                    (isAdult && "User should be older than 18 years")
                  }
                  value={dob}
                  autoComplete="off"
                />
              </div>
              <div className="custom-notes">
                <p>
                  Make sure your pan card number and date of birth is correct.
                  This cannot be change later.
                </p>
              </div>
              <div className="custom-notes note">
                <p>
                  <label> Note :</label>
                  You will have to upload the photo of PAN Cardand an Address
                  Proof. So keep them handy.
                </p>
              </div>
              <div className="verification-btn">
                <div className="check-verification">
                  <button
                    onClick={() => {
                      updatePanAndDob();
                    }}
                    className=" green-btn"
                  >
                    Submit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default IdDetail;
