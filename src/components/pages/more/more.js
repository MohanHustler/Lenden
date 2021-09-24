import React, { useState, useEffect } from "react";

import "./more.scss";

import Header from "../../layout/header/header";
import Loader from "../../common/loader";

import Profile from "./components/more/profile/profile";
import Notification from "./components/more/notification/notification";
import UniversityList from "./components/more/university/university-list";
import SettingList from "./components/more/setting/setting-list";
import Refer from "./components/more/refer/refer";
import Wallet from "./components/more/wallet/wallet";

import {
  getProfileDetails,
  getDashboardDetails
} from "../../../api-integrations/modules/landing-apis";

const More = () => {
  const [loading, setLoading] = useState(false);
  const [userMoreDetails, setUserMoreDetails] = useState([]);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(false);
  const [communicationAddress, setCommunicationAddress] = useState({});
  const [personalDetails, setPersonalDetails] = useState({});
  const [bankDetails, setBankDetails] = useState([]);
  const [accountBalance, setAccountBalance] = useState("");
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    fetchProfileDetails();
    fetchDashboardDetails();
  }, []);

  const fetchProfileDetails = () => {
    setLoading(true);
    getProfileDetails().then(userMoreDetails => {
      setLoading(false);
      if (userMoreDetails != undefined) {
        setUserMoreDetails(userMoreDetails);
        if (userMoreDetails.personal_details) {
          setPersonalDetails(userMoreDetails.personal_details);
        }
        if (userMoreDetails.communication_address) {
          setCommunicationAddress(userMoreDetails.communication_address);
        }
        if (userMoreDetails.bank_details) {
          setBankDetails(userMoreDetails.bank_details);
        }
        if (userMoreDetails.account_balance) {
          setAccountBalance(userMoreDetails.account_balance);
        }
        if (userMoreDetails.documents) {
          setDocuments(userMoreDetails.documents);
        }
      }
    });
  };

  const fetchDashboardDetails = () => {
    getDashboardDetails().then(dashboardDetail => {
      setLoading(false);
      if (dashboardDetail != undefined) {
        setLowBalanceAlert(dashboardDetail.low_balance_alert);
      }
    });
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="more-page-wrapper">
        <Header />
        <div className="more-page-container">
          <div className="more-page-section">
            <div className="more-page-left">
              <div className="profile-section">
                <Profile personalDetails={personalDetails} />
              </div>
              <div className="notify-refer">
                <div className="notify">
                  <Notification />
                </div>
                <div className="refer">
                  <Refer />
                </div>
              </div>
              <div className="university-section">
                <UniversityList />
              </div>
            </div>
            <div className="more-page-right">
              <div className="wallet-section">
                <Wallet
                  accountBalance={accountBalance}
                  bankDetails={bankDetails}
                  lowBalanceAlert={lowBalanceAlert}
                />
              </div>
              <div className="setting-section">
                <SettingList
                  settingTittle="Settings"
                  accountImg1="account"
                  accountImg2="communication"
                  settingTittle1="Account Settings"
                  settingTittle2="Communication Preference"
                  settingLink=""
                  settingsLink2=""
                />
              </div>
              <div className="setting-section">
                <SettingList
                  settingTittle="Help & Support"
                  accountImg1="help"
                  accountImg2="center"
                  settingTittle1="Support Request"
                  settingTittle2="Help Center"
                  settingLink=""
                  settingsLink2="http://support.lendenclub.com/support/solutions/47000512467"
                />
              </div>
              <div className="setting-section">
                <SettingList
                  settingTittle="Bank Details"
                  accountImg2="account"
                  accountImg1="bank"
                  settingTittle1="View Bank Details"
                  settingTittle2=""
                  settingLink=""
                  settingsLink2=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default More;
