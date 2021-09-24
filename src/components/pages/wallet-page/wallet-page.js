import React, { useState } from "react";
import Header from "../../layout/header/header";
import Balance from "./component/balance/balance";
import Withdraw from "./component/withdraw/withdraw";
import InternetBanking from "./component/internet-banking/internet-banking";

import "../dashboard/dashboard.scss";
import "./wallet.scss";

const WalletPage = ({ location }) => {
  const { bankDetails, accountBalance } = location.state;
  const [fundType, setFundType] = useState("internet-banking");

  const chooseFundTypeBanking = () => setFundType("internet-banking");
  const chooseFundTypeUpi = () => setFundType("upi");

  return (
    <div>
      <Header />
      <div className="wallet-wrapper">
        <div className="wallet-container">
          <Balance accountBalance={accountBalance} />
          <div className="internet-add-funds-sec">
            <div className="internet-tab-sec-desc">
              <div className="internet-tab-sec-heading">
                <h2>Add Fund</h2>
                <div className="internet-tab-sec">
                  <label
                    className="active-class"
                    onClick={chooseFundTypeBanking}
                  >
                    Internet Banking
                  </label>
                  <label onClick={chooseFundTypeUpi}>UPI</label>
                </div>
                {fundType === "internet-banking" && (
                  <InternetBanking bankDetails={bankDetails} />
                )}
                {fundType === "upi" && (
                  <div className="upi-sec">
                    <div className="upi-sec-img">
                      <img src={require("../../../assets/images/upi.png")} />
                    </div>
                    <h2>COMING SOON</h2>
                  </div>
                )}
              </div>
              <div className="notes">
                <p>
                  <label> NOTE : </label>We strongly recommend adding above
                  beneficiary by logging in to your bank’s website/web-portal.
                  Your bank’s mobile app may not support addition of new
                  beneficiary with alpha numeric account number.
                </p>
              </div>
            </div>
            <div className="wallet-sec">
              <Withdraw />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
