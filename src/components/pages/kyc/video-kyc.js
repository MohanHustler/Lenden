import React from "react";
import { useHistory } from "react-router-dom";

import "./video-kyc.scss";


const VideoKyc = () => {
  let history = useHistory();

  const redirectToRegistration = () => {
    history.push("/registration");
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
            <h2>Live KYC</h2>
            <p>Please keep your PAN Card ready</p>
            <label>This viedeo KYC requires your original PAN card</label>
          </div>
          <div className="download-app">
            <h2>Download our app to proceed</h2>
            <div className="download-app-card">
              <div className="download-app-card-img">
                <a href="https://apps.apple.com/us/app/lendenclub-p2p-lending/id1389013846">
                  <img src={require("../../../assets/images/kyc/apple.png")} />
                </a>
              </div>
              <div className="download-app-card-img">
                <a href="https://play.google.com/store/apps/details?id=com.innofinsolutions.lendenclub.lender&hl=en_IN">
                  <img src={require("../../../assets/images/kyc/google.png")} />
                </a>
              </div>
            </div>
          </div>
          <div className="pop-message hide ">
            <p>
              Link to download the app has been send to your registered mobile
              number.
            </p>
          </div>
          <div className="proceed-btn">
            <button type="button" className="green-btn" disabled>
              Proceed
            </button>
            <label
              onClick={() => {
                redirectToRegistration();
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

export default VideoKyc;
