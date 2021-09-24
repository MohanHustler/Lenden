import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./portfolio_summary.scss";

import {
  PORTFOLIO_PERCENTAGE_XIRR,
  PORTFOLIO_PERCENTAGE_NET_ROI
} from "../../../../../common/application-constants";

const PortfolioSummary = props => {
  const [portfolioPercentageOption, setportfolioPercentageOption] = useState(
    PORTFOLIO_PERCENTAGE_XIRR
  );

  const updatePortfolioPercentageOption = percentageOption => {
    setportfolioPercentageOption(percentageOption);
  };

  useEffect(() => {
    if (Math.sign(props.portfolioSummary.xirr) === 0) {
      setportfolioPercentageOption(PORTFOLIO_PERCENTAGE_NET_ROI);
    }
  }, [props.portfolioSummary]);
  return (
    <div className="portfolio-summary">
      <div className="portfolio-summary-wrap">
        <div className="dashboard-primary-heading portfolio-summary-heading">
          <h1>
            {/* Portfolio */}
            <Link to="/portfolio">Portfolio</Link>
          </h1>
          <label>Summary</label>
          <span>
            <img
              src={require("../../../../../assets/images/information.png")}
            />
          </span>
        </div>
        <div className="portfolio-summary-detail">
          <div className="portfolio-summary-detail-rate">
            <h1>
              {portfolioPercentageOption === PORTFOLIO_PERCENTAGE_XIRR
                ? Math.sign(props.portfolioSummary.xirr) === -1
                  ? "NA"
                  : props.portfolioSummary.xirr
                : props.portfolioSummary.net_returns}
              %
            </h1>
          </div>
          <div className="portfolio-summary-detail-unit">
            <span
              className={
                portfolioPercentageOption === PORTFOLIO_PERCENTAGE_XIRR
                  ? "active"
                  : ""
              }
              onClick={() => {
                updatePortfolioPercentageOption(PORTFOLIO_PERCENTAGE_XIRR);
              }}
            >
              XIRR
            </span>
            <span
              className={
                portfolioPercentageOption === PORTFOLIO_PERCENTAGE_NET_ROI
                  ? "active"
                  : ""
              }
              onClick={() => {
                updatePortfolioPercentageOption(PORTFOLIO_PERCENTAGE_NET_ROI);
              }}
            >
              NET ROI
            </span>
          </div>
        </div>
      </div>
      <div className="portfolio-summary-value-wrap">
        <div className="portfolio-summary-value">
          <div className="portfolio-summary-value-heading">
            <h1>Portfolio Value</h1>
          </div>
          <div className="portfolio-summary-value-price">
            <label>
              <img
                src={require("../../../../../assets/images/indiarupee.png")}
              />
            </label>
            <span>{props.portfolioSummary.portfolio_value}</span>
          </div>
        </div>
        <div className="portfolio-summary-value">
          <div className="portfolio-summary-value-heading">
            <h1>Amount Added</h1>
          </div>
          <div className="portfolio-summary-value-price">
            <label>
              <img
                src={require("../../../../../assets/images/indiarupee.png")}
              />
            </label>
            <span>{props.portfolioSummary.amount_added}</span>
          </div>
        </div>
        <div className="portfolio-summary-value">
          <div className="portfolio-summary-value-heading">
            <h1>Net Returns</h1>
          </div>
          <div className="portfolio-summary-value-price">
            <label>
              <img
                src={require("../../../../../assets/images/indiarupee.png")}
              />
            </label>
            <span>{props.portfolioSummary.net_returns}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
