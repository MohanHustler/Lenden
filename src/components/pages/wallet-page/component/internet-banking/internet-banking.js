import React from "react";
import "./internet-banking.scss";
const InternetBanking = ({ bankDetails }) => {
  let bankDetail = bankDetails[0];
  return (
    <div>
      <div className="internet-banking">
        <div className="internet-register-details">
          <p>
            Register the following bank account as a beneficiary in your account
            and transfer funds through NEFT/IMPS/RTGS
          </p>
          <div className="accounts-details">
            <ul>
              <li>
                <label>Account Number</label>
                <span>{bankDetail.number}</span>
              </li>
              <li>
                <label>IFSC Code</label>
                <span>{bankDetail.ifsc_code}</span>
              </li>
              <li>
                <label>Account Name</label>
                {/* <span>Lendenclup Lender Funding Isp Account</span> */}
                <span>{bankDetail.name}</span>
              </li>
              <li>
                <label>Account Type</label>
                <span>{bankDetail.type}</span>
              </li>
              <li>
                <label>Bank Name</label>
                <span>{bankDetail.bank__name}</span>
              </li>
              <li>
                <label>Branch</label>
                <span>CMS</span>
              </li>
            </ul>
          </div>
          <div className="contents">
            <p>
              Once you transfer funds to above mentioned bank account, it may
              take upto 4hours for a NEFT/RTGS transaction, and upto 45 minutes
              for an IMPS transaction to reflect in your LenDen account.
            </p>
            <p>
              * If you are using ICICI bank to add benecficiary, please select
              <label>“other bank payee”</label> option.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBanking;
