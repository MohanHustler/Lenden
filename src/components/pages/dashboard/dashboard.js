import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import "./dashboard.scss";

import * as Toastr from "toastr";

import Header from "../../layout/header/header";
import Loader from "../../common/loader";

import PortfolioSummary from "./components/PortfolioSummary/PortfolioSummary";
import AccountBalance from "./components/AccountBalance/AccountBalance";
import TopLoans from "./components/TopLoans/TopLoans";
import P2pLending from "./components/P2pLending/P2pLending";
import InvestPerformance from "./components/InvestPerformance/InvestPerformance";

import {
  getDashboardDetails,
  getUserDetails
} from "../../../api-integrations/modules/landing-apis";
import {
  referAndEarn,
  getProfilePicture
} from "../../../api-integrations/modules/personal-details";
import { getFireBaseReferralLink } from "../../../api-integrations/common/connect";

const Dashboard = () => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [lowBalanceAlert, setLowBalanceAlert] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");
  const [portfolioSummary, setPortfolioSummary] = useState({});
  const [userDashboardDetail, setUserDashboardDetail] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [recommendedLoans, setRecommendedLoans] = useState([]);
  const [stepCount, setStepCount] = useState({});
  const [planColor, setplanColor] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [referralMobileNumber, setReferralMobileNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [
    referralMobileNumberRequired,
    setReferralMobileNumberRequired
  ] = useState("");
  const [referralMobileNumberValid, setReferralMobileNumberValid] = useState(
    ""
  );

  useEffect(() => {
    setLoading(true);
    fetchDashboardDetails();
    fetchProfileDetails();
    fetchUserDetails();
  }, []);

  const fetchDashboardDetails = () => {
    getDashboardDetails().then(dashboardDetail => {
      setLoading(false);
      if (dashboardDetail != undefined) {
        if (dashboardDetail.user_detail) {
          setUserDashboardDetail(dashboardDetail.user_detail);
        }
        setLowBalanceAlert(dashboardDetail.low_balance_alert);
        setDashboardDetails(dashboardDetail);
        setAccountBalance(dashboardDetail.account_balance);
        setPortfolioSummary(dashboardDetail.portfolio_summary);
        setRecommendedLoans(dashboardDetail.recommended_loans);
        setStepCount(dashboardDetail.step_count);
      }
    });
  };

  const fetchProfileDetails = () => {
    getProfilePicture().then(profile => {
      if (profile != undefined) {
        setProfilePic(profile.profile_picture.profile_pic);
      }
    });
  };

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

  const redirectToPlan = () => {
    history.push("/plan");
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
        <Header />
        <div className="dashboard-wrapper">
          <div className="dashboard-container">
            <div className="profile-balance-wrap">
              {portfolioSummary && (
                <PortfolioSummary portfolioSummary={portfolioSummary} />
              )}

              <AccountBalance
                upi={false}
                accountBalance={accountBalance}
                lowBalanceAlert={lowBalanceAlert}
              />
            </div>
            <TopLoans recommendedLoans={recommendedLoans} />
            <div className="lending-performance-wrap">
              <P2pLending />
              <InvestPerformance
                showUserData={portfolioSummary.net_returns > 0}
                xGradient={"#3FA4DC"}
                yGradient={"#9FDAFC"}
                dashLineColor={"#727272"}
              />
            </div>
          </div>
          <div className="dashboard-sidebar">
            <div className="dashboard-plan-detail">
              <div className="dashboard-profile-img">
                {profilePic === "" ? (
                  <img
                    src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                    alt="logo"
                  />
                ) : (
                  <img src={profilePic} />
                )}
              </div>
              <div className="dashboard-profile-detail">
                <div className="dashboard-profile-name">
                  <span>Good Morning,</span>
                  <h1>{userDashboardDetail.user_name}</h1>
                </div>
                {userDashboardDetail.risk_category === "BASICPLAN" && (
                  <label style={{ backgroundColor: "#1e9de4" }}>
                    {userDashboardDetail.risk_category}
                  </label>
                )}
                {userDashboardDetail.risk_category === "SILVER" && (
                  <label style={{ backgroundColor: "#d7d7d7" }}>
                    {userDashboardDetail.risk_category}
                  </label>
                )}
                {userDashboardDetail.risk_category === "GOLD" && (
                  <label style={{ backgroundColor: "#eab327" }}>
                    {userDashboardDetail.risk_category}
                  </label>
                )}
              </div>
            </div>
            <div className="dashboard-profile-notes">
              <h1>Your portfolio can do better</h1>
              <div className="dashboard-profile-notes-wrap">
                <div className="dashboard-profile-notes-img">
                  <img
                    src={require("../../../assets/images/skill.png")}
                    alt="logo"
                  />
                </div>
                <p>
                  Keep your investment active for longer tenure and reinvest
                  earnings to earn higner returns.
                </p>
              </div>
            </div>
            <div className="dashboard-profile-upgrade">
              <h1>Get Higher returns</h1>
              <label>Upgrade to</label>
              <div className="dashboard-profile-ug-card-wrap">
                {userDashboardDetail.risk_category === "BASICPLAN" && (
                  <div
                    className="dashboard-profile-ug-card silver-card"
                    onClick={() => {
                      redirectToPlan();
                    }}
                  >
                    <label>Silver</label>
                    <span>20% off</span>
                  </div>
                )}
                {userDashboardDetail.risk_category === "SILVER" && (
                  <label
                    className="dashboard-profile-ug-card gold-card"
                    onClick={() => {
                      redirectToPlan();
                    }}
                  >
                    <label>Gold</label>
                  </label>
                )}
              </div>
              <p>
                Increase your potential by upgrading your investment account.
              </p>
            </div>
            <div className="dashboard-referral">
              <h1>Refer a friend</h1>
              <label>{referralCode}</label>
              <FormControl fullWidth className="">
                <TextField
                  id="standard-adornment-amount"
                  placeholder="enter mobile number"
                  type="number"
                  error={
                    referralMobileNumberRequired || referralMobileNumberValid
                  }
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
                />
              </FormControl>
              <div className="btn-wrapper">
                <a
                  onClick={() => {
                    triggerReferAndEarn();
                  }}
                  className="violet-button"
                >
                  Invite
                </a>
              </div>
              <div className="app-store">
                <div className="app-store-card">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.innofinsolutions.lendenclub.lender&hl=en_IN"
                    target="_blank"
                  >
                    <img
                      src={require("../../../assets/images/google_play.png")}
                      alt="logo"
                    />
                  </a>
                </div>
                <div className="app-store-card">
                  <a
                    href="https://apps.apple.com/us/app/lendenclub-p2p-lending/id1389013846"
                    target="_blank"
                  >
                    <img
                      src={require("../../../assets/images/app_store.png")}
                      alt="logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
