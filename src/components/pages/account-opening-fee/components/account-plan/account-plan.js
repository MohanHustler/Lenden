import React, { useState, useEffect } from "react";

import "./account-plan.scss";

import ViewPlanDetails from "./view-plan-details";

import { isEmpty } from "lodash";

import {
  getPricingPlan,
  getFeePaymentLink
} from "../../../../../api-integrations/modules/business-apis";
import { getUserEmail } from "../../../../../api-integrations/common/local-storage";

const AccountPlan = props => {
  const [currentPlan, setCurrentPlan] = useState({});
  const [pricingPlanDetails, setPricingPlanDetails] = useState({});
  const [currentPlanName, setCurrentPlanName] = useState({});
  const [silverPlan, setSilverPlan] = useState({});
  const [goldPlan, setGoldPlan] = useState({});
  const [basicPlan, setBasicPlan] = useState({});
  const [expandPlan, setExpandPlan] = useState(false);

  const fetchFeePaymentLink = () => {
    const registrationFeesAfterDiscount = props.registrationFeesAfterDiscount;
    const registrationFees = props.registrationFees;
    var feeAmount =
      registrationFeesAfterDiscount != ""
        ? registrationFeesAfterDiscount
        : registrationFees;
    var feeDetails = {
      purpose: props.paymentPurpose,
      email: getUserEmail(),
      registration_fees: feeAmount
    };

    getFeePaymentLink(feeDetails).then(instamojoDetails => {
      if (instamojoDetails != undefined) {
        window.location.assign(instamojoDetails.url);
      }
    });
  };

  useEffect(() => {
    fetchPricingPlan();
  }, []);

  const expandPlanCard = toggleExpand => {
    setExpandPlan(toggleExpand);
  };

  const updateCurrentPlan = planName => {
    switch (planName) {
      case "Gold":
        setCurrentPlan(goldPlan);
        setCurrentPlanName("gold");
        break;
      case "Silver":
        setCurrentPlan(silverPlan);
        setCurrentPlanName("silver");
        break;
      case "Basic":
        setCurrentPlan(basicPlan);
        setCurrentPlanName("basic");
        break;
      default:
        break;
    }
  };

  const fetchPricingPlan = () => {
    getPricingPlan().then(planDetails => {
      if (planDetails != undefined) {
        setPricingPlanDetails(planDetails);
        setSilverPlan(planDetails.silver);
        setCurrentPlan(planDetails.silver);
        setCurrentPlanName("silver");
        setGoldPlan(planDetails.gold);
        setBasicPlan(planDetails.basic);
      }
    });
  };

  if (isEmpty(pricingPlanDetails)) {
    return <div></div>;
  } else {
    var basicOfferPercentage = parseInt(
      (basicPlan.discounted_price / basicPlan.price) * 100
    );

    var silverOfferPercentage = parseInt(
      (silverPlan.discounted_price / silverPlan.price) * 100
    );

    var goldOfferPercentage = parseInt(
      (goldPlan.discounted_price / goldPlan.price) * 100
    );

    return (
      <div className="account-plan-sec">
        <div className="account-plan-title ">
          <h2>Pick your account plan</h2>
        </div>
        <div
          className={`select-plan-sec ${
            expandPlan ? `${currentPlanName}-plan-view-more` : ""
          }`}
        >
          <div
            className={`select-plan-card basic-plan ${
              currentPlanName === "basic" ? "active-class" : ""
            }`}
            onClick={() => {
              updateCurrentPlan("Basic");
            }}
          >
            <div className="select-plan-card-sec">
              <label className="select-plan-type">Basic</label>
              <div className="plan-offer">
                <p>
                  {basicOfferPercentage || ""}% off{" "}
                  <a> ₹ {basicPlan.discounted_price} </a>
                </p>
                <span
                  onClick={() => {
                    fetchFeePaymentLink();
                  }}
                >
                  Select Plan
                </span>
              </div>
            </div>
          </div>
          <div
            className={`select-plan-card silver-plan ${
              currentPlanName === "silver" ? "active-class" : ""
            }`}
            onClick={() => {
              updateCurrentPlan("Silver");
            }}
          >
            <div className="select-plan-card-sec">
              <label className="select-plan-type">Silver</label>
              <div className="plan-offer">
                <p>
                  {silverOfferPercentage || ""}% off at{" "}
                  <a> ₹ {silverPlan.discounted_price} </a>
                </p>
                <span
                  onClick={() => {
                    fetchFeePaymentLink();
                  }}
                >
                  Select Plan
                </span>
              </div>
            </div>
          </div>
          <div
            className={`select-plan-card gold-plan ${
              currentPlanName === "gold" ? "active-class" : ""
            }`}
            onClick={() => {
              updateCurrentPlan("Gold");
            }}
          >
            <div className="select-plan-card-sec">
              <label className="select-plan-type">Gold</label>
              <div className="plan-offer">
                <p>
                  {goldOfferPercentage || ""}% off{" "}
                  <a> ₹ {goldPlan.discounted_price} </a>
                </p>
                <span
                  onClick={() => {
                    fetchFeePaymentLink();
                  }}
                >
                  Select Plan
                </span>
              </div>
            </div>
          </div>
        </div>
        {currentPlan && currentPlan.features && (
          <ViewPlanDetails
            currentPlan={currentPlan}
            expandPlanCard={toggleExpand => {
              expandPlanCard(toggleExpand);
            }}
          />
        )}
        <div className="upgrade">
          <p>You can always upgrade your plan.</p>
        </div>
      </div>
    );
  }
};

export default AccountPlan;
