import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import * as Toastr from "toastr";

import "./mobile-verification.scss";

import Loader from "../../common/loader";

import {
  STAY_TYPE_RENTED,
  ADDRESS_TYPE_PERMANENT,
  STAY_TYPE_FAMILY_OWNED,
  ADDRESS_TYPE_COMMUNICATION
} from "../../../common/application-constants";

import {
  addAddressDetails,
  getLocationDetails,
  getCommunicationAddress
} from "../../../api-integrations/modules/personal-details";

const ConfirmAddress = props => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [communicationAddress, setCommunicationAddress] = useState("");
  const [landMark, setLandMark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [userState, setUserState] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentLandMark, setPermanentLandMark] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentUserState, setPermanentUserState] = useState("");
  const [sameAsCommunicationAddress, setSameAsCommunicationAddress] = useState(
    false
  );
  const [communicationAddressError, setCommunicationAddressError] = useState(
    false
  );
  const [pincodeRequiredError, setPincodeRequiredError] = useState(false);
  const [pincodeValidError, setPincodeValidError] = useState(false);
  const [landmarkError, setLandmarkError] = useState(false);
  const [permanentAddressError, setPermanentAddressError] = useState(false);
  const [
    permanentPincodeRequiredError,
    setPermanentPincodeRequiredError
  ] = useState(false);
  const [permanentPincodeValidError, setPermanentPincodeValidError] = useState(
    false
  );
  const [permanentLandmarkError, setPermanentLandmarkError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCommunicationDetails();
  }, []);

  const fetchCommunicationDetails = () => {
    getCommunicationAddress().then(addressDetails => {
      setLoading(false);
      var addressData = addressDetails.address_data;
      if (
        addressDetails != undefined &&
        addressData &&
        addressData.length > 0
      ) {
        addressData.map(address => {
          if (address.address_type === ADDRESS_TYPE_COMMUNICATION) {
            setCommunicationAddress(address.address_);
            setLandMark(address.landmark);
            setPincode(address.pin);
            setCity(address.city);
            setUserState(address.state);
          } else if (address.address_type === ADDRESS_TYPE_PERMANENT) {
            setPermanentAddress(address.address_);
            setPermanentLandMark(address.landmark);
            setPermanentPincode(address.pin);
            setPermanentCity(address.city);
            setPermanentUserState(address.state);
          }
        });
      }
    });
  };

  const validAddressDetails = () => {
    var proceedSavingData = true;
    if (communicationAddress == "") {
      proceedSavingData = false;
      setCommunicationAddressError(true);
    } else {
      setCommunicationAddressError(false);
    }

    if (landMark == "") {
      proceedSavingData = false;
      setLandmarkError(true);
    } else {
      setLandmarkError(false);
    }

    if (pincode == "") {
      proceedSavingData = false;
      setPincodeRequiredError(true);
    } else {
      setPincodeRequiredError(false);
    }

    if (pincode.length == 6) {
      setPincodeValidError(false);
    } else {
      proceedSavingData = false;
      setPincodeValidError(true);
    }

    if (permanentAddress == "") {
      proceedSavingData = false;
      setPermanentAddressError(true);
    } else {
      setPermanentAddressError(false);
    }

    if (permanentLandMark == "") {
      proceedSavingData = false;
      setPermanentLandmarkError(true);
    } else {
      setPermanentLandmarkError(false);
    }

    if (permanentPincode.length == 6) {
      setPermanentPincodeValidError(false);
    } else {
      proceedSavingData = false;
      setPermanentPincodeValidError(true);
    }

    if (permanentPincode == "") {
      proceedSavingData = false;
      setPermanentPincodeRequiredError(true);
    } else {
      setPermanentPincodeRequiredError(false);
    }

    return proceedSavingData;
  };

  const updateSameAsCommunicationAddress = sameAsCommunicationAddress => {
    setSameAsCommunicationAddress(sameAsCommunicationAddress);
    if (sameAsCommunicationAddress) {
      setPermanentAddress(communicationAddress);
      setPermanentLandMark(landMark);
      setPermanentPincode(pincode);
      setPermanentCity(city);
      setPermanentUserState(userState);
    } else {
      setPermanentAddress("");
      setPermanentLandMark("");
      setPermanentPincode("");
      setPermanentCity("");
      setPermanentUserState("");
    }
  };

  const updateCommunicationAddress = () => {
    let addressDetails = {
      type: ADDRESS_TYPE_COMMUNICATION,
      address: communicationAddress,
      landmark: landMark,
      pin: pincode,
      city: city,
      state: userState,
      stay_type: STAY_TYPE_RENTED
    };

    if (validAddressDetails()) {
      addAddressDetails(addressDetails).then(response => {
        if (response != undefined) {
          updatePermanentAddress();
        }
      });
    }
  };

  const updatePermanentAddress = () => {
    let addressDetails = {
      type: ADDRESS_TYPE_PERMANENT,
      address: permanentAddress,
      landmark: permanentLandMark,
      pin: permanentPincode,
      city: permanentCity,
      state: permanentUserState,
      stay_type: STAY_TYPE_FAMILY_OWNED
    };

    if (permanentPincode.length != 6) {
      Toastr.error("Invalid permanent pincode", "Validation Failed");
    } else {
      addAddressDetails(addressDetails).then(response => {
        if (response != undefined) {
          Toastr.success(
            "Data Saved Successfully",
            "Address Confirmation Status"
          );
          history.push("/connectbank");
        }
      });
    }
  };

  const updateConfirmationAddress = () => {
    updateCommunicationAddress();
  };

  const fetchLocationDetails = (userPincode, updateFor) => {
    getLocationDetails({ pin: userPincode }).then(locationDetails => {
      setLoading(false);
      if (locationDetails != undefined) {
        var postOffices = locationDetails.PostOffice;
        if (postOffices.length) {
          var postOffice = postOffices[0];
          if (updateFor == "Communication") {
            setCity(postOffice.District);
            setUserState(postOffice.State);
          } else {
            setPermanentCity(postOffice.District);
            setPermanentUserState(postOffice.State);
          }
        }
      }
    });
  };
  var pinCodeConditions =
    pincode === permanentPincode && permanentPincode != "" && pincode != "";

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
              src={require("../../../assets/images/mobile-verification/confirm_address.png")}
            />
          </div>
        </div>
        <div className="verification">
          <div className="verfication-text confirm">
            <h1>Confirm Address</h1>
            <h2>Confirm your communication address</h2>
          </div>
          <div className="custom-form">
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="Communication Address"
                fullWidth
                error={communicationAddressError}
                helperText={
                  communicationAddressError &&
                  "Please enter communication address"
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => {
                  setCommunicationAddress(e.target.value);
                }}
                value={communicationAddress}
                autoComplete="off"
              />
            </div>
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="Landmark"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                error={landmarkError}
                helperText={landmarkError && "Please enter landmark"}
                onChange={e => {
                  setLandMark(e.target.value);
                }}
                value={landMark}
                autoComplete="off"
              />
            </div>
            <div className="custom-input">
              <TextField
                id="standard-full-width"
                placeholder="PIN Code"
                fullWidth
                error={pincodeRequiredError || pincodeValidError}
                helperText={
                  (pincodeRequiredError && "Please enter pincode") ||
                  (pincodeValidError && "Please enter valid pincode")
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                type="number"
                onInput={e => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
                onChange={e => {
                  setPincode(e.target.value);
                  if (e.target.value == "") {
                    setCity("");
                    setUserState("");
                  }
                  if (e.target.value.length == 6) {
                    setLoading(true);
                    fetchLocationDetails(e.target.value, "Communication");
                  }
                }}
                value={pincode}
                autoComplete="off"
              />
            </div>
            <div className="custom-label">
              <div>
                <label>{`City: `}</label>
                <span>{city || "(Fill Pincode)"}</span>
              </div>
              <div className="state-details">
                <label>{`State: `}</label>
                <span>{userState || "(Fill Pincode)"}</span>
              </div>
            </div>

            <div className="custom-notes paragraph">
              <span className="check-box">
                <div className="white-checkbox-sec">
                  <label class="container">
                    <input
                      type="checkbox"
                      onClick={_ => {
                        updateSameAsCommunicationAddress(
                          !sameAsCommunicationAddress
                        );
                      }}
                      checked={pinCodeConditions || sameAsCommunicationAddress}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </span>
              <p>Permanent Address is same as above</p>
            </div>

            <div className="permanent-address">
              <div className="verfication-text confirm">
                <h2>Confirm your permanent address</h2>
              </div>
              <div className="custom-input">
                <TextField
                  id="standard-full-width"
                  placeholder="Permanent Address"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={permanentAddressError}
                  helperText={
                    permanentAddressError && "Please enter permanent address"
                  }
                  onChange={e => {
                    setPermanentAddress(e.target.value);
                  }}
                  value={permanentAddress}
                  autoComplete="off"
                />
              </div>
              <div className="custom-input">
                <TextField
                  id="standard-full-width"
                  placeholder="Landmark"
                  fullWidth
                  margin="normal"
                  error={permanentLandmarkError}
                  helperText={permanentLandmarkError && "Please enter landmark"}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => {
                    setPermanentLandMark(e.target.value);
                  }}
                  value={permanentLandMark}
                  autoComplete="off"
                />
              </div>
              <div className="custom-input">
                <TextField
                  id="standard-full-width"
                  placeholder="PIN Code"
                  fullWidth
                  margin="normal"
                  error={
                    permanentPincodeRequiredError || permanentPincodeValidError
                  }
                  helperText={
                    (permanentPincodeRequiredError && "Please enter pincode") ||
                    (permanentPincodeValidError && "Please enter valid pincode")
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  type="number"
                  onInput={e => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                  onChange={e => {
                    setPermanentPincode(e.target.value);
                    if (e.target.value == "") {
                      setPermanentCity("");
                      setPermanentUserState("");
                    }

                    if (e.target.value.length == 6) {
                      setLoading(true);
                      fetchLocationDetails(e.target.value, "Permanent");
                    }
                  }}
                  value={permanentPincode}
                  autoComplete="off"
                />
              </div>
              <div className="custom-label">
                <div>
                  <label>{`City: `}</label>
                  <span>{permanentCity || "(Fill Pincode)"}</span>
                </div>
                <div className="state-details">
                  <label>{`State: `}</label>
                  <span>{permanentUserState || "(Fill Pincode)"}</span>
                </div>
              </div>
            </div>

            <div className="verification-btn">
              <button
                onClick={() => {
                  updateConfirmationAddress();
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

export default ConfirmAddress;
