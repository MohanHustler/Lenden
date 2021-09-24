import React, { useState, useEffect } from "react";

import "../portfolio/portfolio.scss";
import "../dashboard/dashboard.scss";

import Header from "../../layout/header/header";
import Loader from "../../common/loader";

import PortfolioSummary from "../dashboard/components/PortfolioSummary/PortfolioSummary";
import InvestPerformance from "../dashboard/components/InvestPerformance/InvestPerformance";
import InversmentHistory from "./componenet/investment-history/investment-history";

import { getPortfolioDetails } from "../../../api-integrations/modules/landing-apis";

import Income from "../../pages/portfolio/componenet/income/income";

import InvestmentCard from "../../pages/portfolio/componenet/investment-status-card/investment-status-card";
import InvestmentCardMore from "../../pages/portfolio/componenet/investment-status-card/more-status-card";
import Money from "../../../assets/images/money.png";
import Punctuality from "../../../assets/images/punctuality.png";
import More from "../../../assets/images/more.png";

const Portfolio = () => {
  const [loading, setLoading] = useState(false);
  const [portfolioDetails, setPortfolioDetails] = useState({});
  const [investmentHistory, setInvestmentHistory] = useState({});
  const [investmenStatus, setInvestmentStatus] = useState({});
  const [portfolioSummary, setPortfolioSummary] = useState({});
  const [repaymentHistory, setRepaymentHistory] = useState({});
  const [breakupPortfolioValue, setbreakupPortfolioValue] = useState({});
  const [fiveAddMoneyTransactions, setFiveAddMoneyTransactions] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPortfolioDetails().then(portfolioDetails => {
      setLoading(false);
      if (portfolioDetails != undefined) {
        setPortfolioDetails(portfolioDetails);
        setInvestmentHistory(portfolioDetails.investment_history);
        setInvestmentStatus(portfolioDetails.investment_status);
        setPortfolioSummary(portfolioDetails.portfolio_summary);
        setRepaymentHistory(portfolioDetails.repayment_history);
        setbreakupPortfolioValue(portfolioDetails.break_up_of_portfolio_value);
        setFiveAddMoneyTransactions(
          portfolioDetails.five_add_money_transactions
        );
      }
    });
  }, []);

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
        <div className="portfolio-wrapper">
          <div className="portfolio-container">
            <div className="portfolio-wrap">
              <PortfolioSummary portfolioSummary={portfolioSummary} />
              <InvestPerformance
                showUserData={portfolioSummary.net_returns > 0}
                xGradient={"#3FA4DC"}
                yGradient={"#9FDAFC"}
                dashLineColor={"#727272"}
              />
              <InversmentHistory
                title="Investment History"
                investmentHistory={investmentHistory}
              />
              <InversmentHistory
                title="Repayment History"
                repaymentHistory={repaymentHistory}
              />
            </div>
            <div className="invesment-titile">
              <h2>
                Additional Income
                <span>
                  <img
                    src={require("../../../assets/images/information.png")}
                  />
                </span>
              </h2>
              <p>
                Last 5 transactions
                <span>
                  (last 4 additional income from delay payment and eferral
                  earning)
                </span>
              </p>
            </div>
            <div className="income-card-sec">
              <Income />
              <Income />
              <Income />
              <Income />
              <Income />
            </div>
            <div className="download-inves">
              <button className="blue-btn">
                Download Income Statement
                <span>
                  <img src={require("../../../assets/images/download.png")} />
                </span>
              </button>
            </div>
            <div className="invesment-card-title">
              <h2>My Investments</h2>
              <div className="invesment-cards">
                <InvestmentCard title="Invested" imgUrl={Money} />
                <InvestmentCard title="Regular" imgUrl={Punctuality} />
                <InvestmentCardMore title="More" imgUrl={More} />
              </div>
            </div>
            <div className="invesment-card-title">
              <h2>Account Report</h2>
              <ul className="investment-cardlist">
                <li>
                  <label>Account Statement</label>
                </li>
                <li>
                  <label>Income Statement</label>
                </li>
                <li>
                  <label>EMI Statement</label>
                </li>
                <li>
                  <label>Investment Statement</label>
                </li>
                <li>
                  <label>XIRR Report</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Portfolio;
