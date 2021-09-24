import React from "react";
import { useHistory } from "react-router-dom";

import "../kyc/video-kyc.scss";

const Registration = () => {
  let history = useHistory();

  const redirectToVideoKyc = () => {
    history.push("/videokyc");
  };

  const redirectToKycConfirmation = () => {
    history.push("/kycconfirmation");
  };

  const redirectToConnectBank = () => {
    history.push("/connectbank");
  };

  const redirectToDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <div className="kyc-sec">
      <div className="kyc-sec-img">
        <div className="kyc-sec-img-contanier">
          <img src={require("../../../assets/images/kyc/livekyc.png")} />
        </div>
      </div>
      <div className="kyc-sec-content">
        <div className="kyc-sec-content-desc">
          <div className="kyc-sec-content-reg">
            <h2>Complete Regestration</h2>
            <p>
              Your payment was successful. Complete the following steps to get
              on with investment.
            </p>
          </div>
          <div className="registration-process">
            <div
              className="registration-btn-sec"
              onClick={() => {
                redirectToVideoKyc();
              }}
            >
              <div className="registration-btn-image">
                <img
                  src={require("../../../assets/images/kyc/rectangle.png")}
                />
              </div>
              <div className="registration-content">
                <div className="registration-content-icon">
                  <img src={require("../../../assets/images/kyc/card.png")} />
                </div>
                <div className="registration-content-desc">
                  <label>ID Process</label>
                  <span>(video KYC)</span>
                </div>
              </div>
            </div>
            <div
              className="registration-btn-sec"
              onClick={() => {
                redirectToKycConfirmation();
              }}
            >
              <div className="registration-btn-image">
                <img
                  src={require("../../../assets/images/kyc/rectangle.png")}
                />
              </div>
              <div className="registration-content">
                <div className="registration-content-icon">
                  <img src={require("../../../assets/images/kyc/detail.png")} />
                </div>
                <div className="registration-content-desc">
                  <label>Basic Details</label>
                </div>
              </div>
            </div>
            <div
              className="registration-btn-sec"
              onClick={() => {
                redirectToConnectBank();
              }}
            >
              <div className="registration-btn-image">
                <img
                  src={require("../../../assets/images/kyc/rectangle.png")}
                />
              </div>
              <div className="registration-content">
                <div className="registration-content-icon">
                  <img src={require("../../../assets/images/kyc/bank.png")} />
                </div>
                <div className="registration-content-desc">
                  <label>Add Account</label>
                  <span>(Verify Bank Account)</span>
                </div>
              </div>
            </div>
            <div className="registration-btn-sec disable">
              <div className="registration-btn-image">
                <img src={require("../../../assets/images/kyc/disabel.png")} />
              </div>
              <div className="registration-content">
                <div className="registration-content-icon">
                  <img src={require("../../../assets/images/kyc/wallet.png")} />
                </div>
                <div className="registration-content-desc">
                  <label>Start Investing</label>
                  <span>(Transfer Funds)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="proceed-btn">
            <button
              onClick={() => {
                redirectToKycConfirmation();
              }}
              className="green-btn"
            >
              Proceed
            </button>
            <label
              onClick={() => {
                redirectToDashboard();
              }}
            >
              skip
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
