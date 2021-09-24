import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

import "./plan.scss";

import { isEmpty } from "lodash";

import Loader from "../../common/loader";
import NoDataFound from "../../common/no-data-found";

import { getPricingPlan } from "../../../api-integrations/modules/business-apis";
import Header from "../../layout/header/header";

const Plan = () => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [pricingPlanDetails, setPricingPlanDetails] = useState({});
  const [silverPlan, setSilverPlan] = useState({});
  const [goldPlan, setGoldPlan] = useState({});
  const [basicPlan, setBasicPlan] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchPricingPlan();
  }, []);

  const fetchPricingPlan = () => {
    getPricingPlan().then(planDetails => {
      setLoading(false);
      if (planDetails != undefined) {
        setPricingPlanDetails(planDetails);
        setSilverPlan(planDetails.silver);
        setGoldPlan(planDetails.gold);
        setBasicPlan(planDetails.basic);
      }
    });
  };

  const moveBack = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    if (isEmpty(pricingPlanDetails)) {
      return <NoDataFound />;
    } else {
      return (
        <div>
          <Header />
          <div className="plan-wrapper">
            <div className="plan-container">
              <div
                className="back-menu"
                onClick={() => {
                  moveBack();
                }}
              >
                <h1>
                  <span>
                    <img
                      src={require("../../../assets/images/back_arrow.png")}
                      alt="logo"
                    />
                  </span>
                  Plans
                </h1>
              </div>
              <div className="plan-card-wrapper">
                <div className="current-plan-card">
                  <div className="plan-card-heading">
                    <h1>Current Plan</h1>
                  </div>
                  <div className="plan-card-detail-wrapper basic-card-wrapper">
                    <div className="plan-card basic-card">
                      <label>Basic</label>
                    </div>
                    <div className="plan-card-details">
                      <div className="free-notes">
                        <div className="free-notes-price">
                          <span>&#8377;</span>
                          <label>{basicPlan.discounted_price}</label>
                        </div>
                        <div className="free-notes-text">
                          <h2>{basicPlan.price}</h2>
                        </div>
                      </div>
                      <ul>
                        {basicPlan.features &&
                          basicPlan.features.map((feature, index) => {
                            return (
                              <li key={`basic-${index}`}>
                                <span>{feature}</span>
                                <label>
                                  <img
                                    src={require("../../../assets/images/check.png")}
                                    alt="logo"
                                  />
                                </label>
                              </li>
                            );
                          })}
                        <li>
                          <label>Customer Support</label>
                          <div className="customer-support-icon">
                            <span>
                              <a href="mailto: example@gmail.com">
                                <img
                                  src={require("../../../assets/images/mail.png")}
                                  alt="logo"
                                />
                              </a>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="switch-plan-card">
                  <div className="plan-card-heading">
                    <h1>For better returns, switch to</h1>
                  </div>
                  <div className="plan-card-detail-total-wrapper">
                    <div className="plan-card-detail-wrapper silver-card-wrapper">
                      <div className="plan-card silver-card">
                        <label>Silver</label>
                      </div>
                      <div className="plan-card-details">
                        <div className="free-notes">
                          <div className="free-notes-price">
                            <span>&#8377;</span>
                            <label>{silverPlan.discounted_price}</label>
                          </div>
                          <div className="free-notes-text">
                            <h2>{silverPlan.price}</h2>
                          </div>
                        </div>
                        <ul>
                          {silverPlan.features &&
                            silverPlan.features.map((feature, index) => {
                              return (
                                <li key={`silver-${index}`}>
                                  <span>{feature}</span>
                                  <label>
                                    <img
                                      src={require("../../../assets/images/check.png")}
                                      alt="logo"
                                    />
                                  </label>
                                </li>
                              );
                            })}
                          <li>
                            <label>Customer Support</label>
                            <div className="customer-support-icon">
                              <span>
                                <a href="mailto: example@gmail.com">
                                  <img
                                    src={require("../../../assets/images/mail.png")}
                                    alt="logo"
                                  />
                                </a>
                              </span>
                              <span>
                                <a href="tel:+91-22-39698384">
                                  <img
                                    src={require("../../../assets/images/call.png")}
                                    alt="logo"
                                  />
                                </a>
                              </span>
                            </div>
                          </li>
                        </ul>
                        <div className="btn-wrapper">
                          <a className="upgrade-button">Upgrade Now</a>
                        </div>
                      </div>
                    </div>
                    <div className="plan-card-detail-wrapper gold-card-wrapper">
                      <div className="plan-card gold-card">
                        <label>Gold</label>
                      </div>
                      <div className="plan-card-details">
                        <div className="free-notes">
                          <div className="free-notes-price">
                            <span>&#8377;</span>
                            <label>{goldPlan.discounted_price}</label>
                          </div>
                          <div className="free-notes-text">
                            <h2>{goldPlan.price}</h2>
                          </div>
                        </div>
                        <ul>
                          {goldPlan.features &&
                            goldPlan.features.map((feature, index) => {
                              return (
                                <li key={`gold-${index}`}>
                                  <span>{feature}</span>
                                  <label>
                                    <img
                                      src={require("../../../assets/images/check.png")}
                                      alt="logo"
                                    />
                                  </label>
                                </li>
                              );
                            })}
                          <li>
                            <label>Customer Support</label>
                            <div className="customer-support-icon">
                              <span>
                                <a href="mailto: example@gmail.com">
                                  <img
                                    src={require("../../../assets/images/mail.png")}
                                    alt="logo"
                                  />
                                </a>
                              </span>
                              <span>
                                <a href="tel:+91-22-39698384">
                                  <img
                                    src={require("../../../assets/images/call.png")}
                                    alt="logo"
                                  />
                                </a>
                              </span>
                            </div>
                          </li>
                        </ul>
                        <div className="btn-wrapper">
                          <a className="upgrade-button">Upgrade Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Plan;
