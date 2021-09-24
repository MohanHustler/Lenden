import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Bar } from "react-chartjs-2";

import AccountPlan from "./components/account-plan/account-plan";
import InvestPerformance from "../dashboard/components/InvestPerformance/InvestPerformance";
import CurrentOpenInvestment from "../../pages/account-opening-fee/components/current-open-investment/current-open-investment";

import Faq from "./components/faq/faq";

import "./account-opening-fee.scss";

import {
  getWhyLendenClub,
  getFaq,
  getFeeStatus
} from "../../../api-integrations/modules/business-apis";
import { getInvestDetails } from "../../../api-integrations/modules/landing-apis";

const AccountOpeningFee = () => {
  let history = useHistory();

  const [whyLendenClub, setWhyLendenClub] = useState({});
  const [faq, setFaq] = useState([]);
  const [topTwentyInvest, setTopTwentyInvest] = useState([]);
  const [paymentPurpose, setPaymentPurpose] = useState("");
  const [registrationFees, setRegistrationFees] = useState("");
  const [
    registrationFeesAfterDiscount,
    setRegistrationFeesAfterDiscount
  ] = useState("");

  useEffect(() => {
    fetchWhyLendenClub();
    fetchFaq();
    fetchInvestDetails();
    fetchFeeStatus();
  }, []);

  const fetchFeeStatus = () => {
    getFeeStatus().then(feeDetails => {
      if (feeDetails != undefined) {
        setPaymentPurpose(feeDetails.purpose);
        setRegistrationFees(feeDetails.registration_fees);
        setRegistrationFeesAfterDiscount(
          feeDetails.registration_fees_after_discount
        );
        if (feeDetails.status == "fees_paid") {
          history.push("/legalauthorization");
        }
      }
    });
  };

  const fetchWhyLendenClub = () => {
    getWhyLendenClub().then(whyLendenResponse => {
      if (whyLendenResponse != undefined) {
        setWhyLendenClub(whyLendenResponse);
      }
    });
  };

  const fetchFaq = () => {
    getFaq().then(faqResponse => {
      if (faqResponse != undefined) {
        setFaq(faqResponse.faqs);
      }
    });
  };

  const fetchInvestDetails = () => {
    const investDetails = {
      tenure: `1,2`,
      loan_purpose: `ADVANCE SALARY, HOME RENOVATION`,
      cibil_score: `650 TO 750`,
      funded: `20% to 40%`,
      risk_category: `VERY HIGH, LOW`
    };

    getInvestDetails(investDetails).then(allInvests => {
      if (allInvests != undefined) {
        setTopTwentyInvest(allInvests.loans.slice(0, 20));
      }
    });
  };

  const mobileData = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#5196D5");
    gradient.addColorStop(1, "#A6E3FF");

    return {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        {
          label: "Invest Performance",
          backgroundColor: gradient,
          borderColor: gradient,
          pointBorderColor: gradient,
          pointBackgroundColor: gradient,
          fill: false,
          borderWidth: 2,
          hoverBackgroundColor: gradient,
          hoverBorderColor: gradient,
          data: [45, 60, 75, 45, 60, 75, 90]
        }
      ]
    };
  };

  return (
    <div className="account-sec">
      <div className="account-opening">
        <div className="account-opening-desc">
          <h2>Account Openeing Fees</h2>
          <p>
            You are halfway there. Please complete your acc. openening fee to
            continue.
          </p>
        </div>
        <div className="potential-return">
          <div className="potential-return-heading">
            <h2>Potential return calculator</h2>
            <p>
              Rs. 15,000 invested in the following instrument together could
              give you the following returns
            </p>
          </div>
          <div className="potential-return-pipe-chart">
            <InvestPerformance
              showUserData={false}
              xGradient={"#B9B9B9"}
              yGradient={"#D5D5D5"}
              dashLineColor={"#727272"}
            />
          </div>
        </div>
        <div className="invest-club">
          <h2>Why Invest with LenDenClub ?</h2>
          <div className="invest-club-card-sec">
            <div className="invest-club-card">
              <div className="invest-club-card-img">
                <img src={require("../../../assets/images/lenden/rupee.png")} />
              </div>
              <div className="invest-club-card-content">
                <h3>{whyLendenClub.total_amount_invested}</h3>
                <p>Total Amount Invested</p>
              </div>
            </div>
            <div className="invest-club-card">
              <div className="invest-club-card-img">
                <img
                  src={require("../../../assets/images/lenden/gropup.png")}
                />
              </div>
              <div className="invest-club-card-content">
                <h3>{whyLendenClub.total_active_borrower}</h3>
                <p>Total Active Borrower</p>
              </div>
            </div>
            <div className="invest-club-card">
              <div className="invest-club-card-img">
                <img src={require("../../../assets/images/lenden/hand.png")} />
              </div>
              <div className="invest-club-card-content">
                <h3>{whyLendenClub.average_returns_earned}</h3>
                <p>Avg Return Earned</p>
              </div>
            </div>
            <div className="invest-club-card">
              <div className="invest-club-card-img">
                <img
                  src={require("../../../assets/images/lenden/finance.png")}
                />
              </div>
              <div className="invest-club-card-content">
                <h3>P2P- NBFC</h3>
                <p>RBI Certified</p>
              </div>
            </div>
          </div>
        </div>
        <Faq faq={faq} />
      </div>
      <div className="select-account-plan">
        <div className="select-account-plan-pick">
          <AccountPlan
            paymentPurpose={paymentPurpose}
            registrationFees={registrationFees}
            registrationFeesAfterDiscount={registrationFeesAfterDiscount}
          />
        </div>
        <div className="investment-account-plan">
          <CurrentOpenInvestment topTwentyInvest={topTwentyInvest} />
        </div>
      </div>
      <div className="mobile-account-sec">
        <div className="mobile-account-heading">
          <h2>Account Opening Fees</h2>
          <p>
            You are halfway there. Please complete your acc. openening fee to
            continue.
          </p>
        </div>
        {/* <AccountPlan /> */}
        <div className="mobile-pick-your-plan">
          <h2>Potential return calculator</h2>
          <label>How much you want to invest ?</label>
          <p>
            Rs. 15,000 invested in the following instrument together could give
            you the following returns.
          </p>
        </div>
        <div className="mobile-bar">
          <Bar
            data={mobileData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: false,
                text: "",
                fontSize: 20
              },
              legend: {
                display: false,
                position: "right"
              },
              scales: {
                xAxes: [
                  {
                    display: false,
                    ticks: {
                      beginAtZero: true,
                      mirror: true
                    }
                  }
                ],
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: true,
                      mirror: true
                    }
                  }
                ]
              },
              tooltips: {
                enabled: false,
                // mode: 'nearest'
                mode: "point"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountOpeningFee;
