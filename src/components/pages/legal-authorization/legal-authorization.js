import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./legal-authorization.scss";
import "../../../assets/styles/style.scss";

import * as Toastr from "toastr";

import { getProfileDetails } from "../../../api-integrations/modules/landing-apis";
import { acceptLegalAuthorizationAndCompliance } from "../../../api-integrations/modules/business-apis";

const LegalAuthorization = () => {
  let history = useHistory();

  const [userDetails, setUserDetails] = useState(false);
  const [authorityLetter, setAuthorityLetter] = useState(false);
  const [rbiCompliance, setRbiCompliance] = useState(false);

  const [showAuthorityLetter, setShowAuthorityLetter] = useState(false);
  const [showRbiCompliance, setShowRbiCompliance] = useState(false);

  useEffect(() => {
    getProfileDetails().then(responseUserDetails => {
      if (
        responseUserDetails &&
        responseUserDetails.personal_details != undefined
      ) {
        setUserDetails(responseUserDetails.personal_details);
      }
    });
  }, []);

  const toggleAuthorityLetter = () =>
    setShowAuthorityLetter(!showAuthorityLetter);
  const toggleRbiCompliance = () => setShowRbiCompliance(!showRbiCompliance);

  const redirectToRegistration = () => {
    var authorizationDetails = {
      authorization_letter: authorityLetter,
      rbi_compliance: rbiCompliance
    };

    acceptLegalAuthorizationAndCompliance(authorizationDetails).then(
      response => {
        if (response != undefined) {
          Toastr.success("Agreed Successfully", "Legal Authorization Status");
          history.push("/registration");
        }
      }
    );
  };

  return (
    <div>
      <div className="leagal-auth-sec">
        <div className="leagal-auth">
          <div className="leagal-auth-image">
            <div className="leagal-auth-image-container">
              <img
                src={require("../../../assets/images/lenden/lending-banner.png")}
              />
            </div>
          </div>
          <div className="leagal-auth-accept-sec">
            <div className="leagal-auth-accept-desc-sec">
              <div className="leagal-auth-accept-content">
                <h2>Congratulatons {userDetails.full_name}</h2>
                <p>Please accept the following P2P terms for Investment.</p>
              </div>
              <div className="auth-letter">
                <div
                  className="auth-letter-collaps"
                  onClick={toggleAuthorityLetter}
                >
                  <label>Authorization Letter</label>
                  <span>
                    <img
                      src={require("../../../assets/images/lenden/down-arrow.png")}
                    />
                  </span>
                </div>
                {showAuthorityLetter ? (
                  <div className="auth-letter-collaps-desc">
                    <label>Dear {userDetails.full_name} ,</label>
                    <p>
                      We need your authorisation to complete any lending
                      transaction initiated by you. This authorisation also
                      helps us initiate legal action against the borrower in
                      case of default. For any query on this, please get in
                      touch with our customer service officer at
                      cs@lendenclub.com.
                    </p>
                    <a target="_blank" href="/authorityletter">
                      open in new window
                      <img
                        src={require("../../../assets/images/lenden/external.png")}
                      />
                    </a>
                  </div>
                ) : null}
              </div>
              <div className="auth-accept-check">
                <div>
                  <div className="checkbox-accept">
                    <label class="container">
                      <input
                        type="checkbox"
                        onClick={e => {
                          setAuthorityLetter(!authorityLetter);
                        }}
                        checked={authorityLetter}
                      />
                      <span class="checkmark"></span>
                      <p>I accept the terms.</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="auth-letter">
                <div
                  className="auth-letter-collaps"
                  onClick={toggleRbiCompliance}
                >
                  <label>RBI Compliance</label>
                  <span>
                    <img
                      src={require("../../../assets/images/lenden/down-arrow.png")}
                    />
                  </span>
                </div>
                {showRbiCompliance ? (
                  <div className="auth-letter-collaps-desc">
                    <label>Dear {userDetails.full_name} ,</label>
                    <p>
                      Based on RBI regulations for Peer to Peer lending
                      platforms we require the below mentioned confirmation from
                      you
                    </p>
                    <p>
                      1. If I have invested more than Rs. 50,00,000 across P2P
                      Lending Platforms in India, I will stop lending on
                      LenDenClub
                    </p>
                    <p>
                      2. I will not lend more than Rs. 50,000 to a single
                      borrower on P2P lending platforms including LenDenClub.
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="auth-accept-check">
                <div>
                  <div className="checkbox-accept">
                    <label class="container">
                      <input
                        type="checkbox"
                        onClick={e => {
                          setRbiCompliance(!rbiCompliance);
                        }}
                        checked={rbiCompliance}
                      />
                      <span class="checkmark"></span>
                      <p>I accept the terms.</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="proceed-btn">
                <button
                  onClick={() => {
                    redirectToRegistration();
                  }}
                  className="green-btn"
                  disabled={!authorityLetter || !rbiCompliance}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAuthorization;
