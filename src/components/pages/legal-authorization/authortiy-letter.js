import React, { useState, useEffect } from "react";

import "./legal-authorization.scss";
import "../../../assets/styles/style.scss";

import moment from "moment";

import { getProfileDetails } from "../../../api-integrations/modules/landing-apis";
import { getUserId } from "../../../api-integrations/common/local-storage";

const AuthorityLetter = () => {
  const [userDetails, setUserDetails] = useState(false);
  const userId = getUserId();

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
          <div className="leagal-auth-accept-sec leagal-auth-accept-letter">
            <div className="leagal-auth-accept-desc-sec leagal-auth-accept-desc-letter">
              <div className="leagal-auth-accept-letter-desc">
                <h2>Authority Letter</h2>
                <p>
                  To {userDetails.full_name} <br />
                  LenDenClub.com ( Owned &amp; operated by Innofin Solutions
                  Private Limited ) Unit No. 5, Mezzanine Floor, DLH Park, S V
                  Road, Goregaon West, Mumbai, Maharashtra, India - 400062
                  Subject: Authority to sign/collect documents and authorization
                  to initiate collection/recovery against borrowers
                </p>
                <p>
                  I, {userDetails.full_name}, a registered lender with
                  LenDenClub (www.lendenclub.com), an online platform operated
                  by Innofin Solutions Pvt Ltd, an NBFC-P2P registered with the
                  Reserve Bank of India, with User ID {userId}
                  (“Lender”), hereby authorises Innofin Solutions Private
                  Limited (“LenDenClub”): (i) to sign and execute the loan
                  agreement to be entered with the borrower from time to time
                  (copy of which has been provided to me); and (ii) to collect
                  cheques from the borrower, on my behalf
                </p>
                <p>
                  I further authorise you to initiate legal action against any
                  borrower in case of default in payment or non-payment by the
                  borrower for more than 30 days as and when need arises and on
                  such fees as may be mutually agreed between LenDenClub and
                  myself.
                </p>
                <p>
                  I further confirm that I am liable and bound by all acts
                  committed and obligations incurred under the above
                  authorisation given to LenDenClub. LenDenClub shall have no
                  obligations whatsoever while conducting any activity under
                  this authorisation letter.
                </p>
                <p>
                  This authority letter shall cease to be in effect from the
                  date on which the Lender ceases to be registered as a lender
                  with www.LenDenClub.com
                </p>
                <p>
                  Yours faithfully <br />
                  {userDetails.full_name}
                </p>
                <p>
                  Accepted Electronically on {moment().format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="simple-agreement-sec">
                <a
                  href="https://s3-ap-southeast-1.amazonaws.com/lenden-static-files/react-images/Sample-Agreement.pdf"
                  className="simple-agreement-content"
                >
                  Click to view the Sample Loan Agreement
                </a>
                <a
                  href="/legalauthorization"
                  className="simple-agreement-content"
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityLetter;
