import React, { useState } from "react";
import "./investment-history.scss";
import { Bar } from "react-chartjs-2";

const InvestmentHistroy = ({ investmentHistory, repaymentHistory, title }) => {
  const [activeMonth, setActiveMonth] = useState("twelve");

  let graphData, totalInvestMent, totalInvestmentCount;

  if (investmentHistory) {
    if (activeMonth === "current") {
      let invest = investmentHistory;
      graphData = invest.current_month_investments;
      totalInvestMent = invest.current_month_total_investments;
      totalInvestmentCount = invest.current_month_total_investments_counts;
    } else if (activeMonth === "three") {
      let invest = investmentHistory;
      graphData = invest.three_months;
      totalInvestMent = invest.three_month_total_investments;
      totalInvestmentCount = invest.three_month_total_investments_counts;
    } else if (activeMonth === "six") {
      let invest = investmentHistory;
      graphData = invest.six_months;
      totalInvestMent = invest.six_month_total_investments;
      totalInvestmentCount = invest.six_month_total_investments_counts;
    } else if (activeMonth === "twelve") {
      let invest = investmentHistory;
      graphData = invest.twelve_months;
      totalInvestMent = invest.twelve_month_total_investments;
      totalInvestmentCount = invest.twelve_month_total_investments_counts;
    }
  } else if (repaymentHistory) {
    if (activeMonth === "current") {
      graphData = [];
    } else if (activeMonth === "three") {
      graphData = repaymentHistory.three_months;
      totalInvestMent = repaymentHistory.three_sum_interest;
      totalInvestmentCount = repaymentHistory.three_sum_principal;
    } else if (activeMonth === "six") {
      graphData = repaymentHistory.six_months;
      totalInvestMent = repaymentHistory.six_sum_interest;
      totalInvestmentCount = repaymentHistory.six_sum_principal;
    } else if (activeMonth === "twelve") {
      graphData = repaymentHistory.twelve_months;
      totalInvestMent = repaymentHistory.twelve_sum_interest;
      totalInvestmentCount = repaymentHistory.twelve_sum_principal;
    }
  }

  const data = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#3FA4DC");
    gradient.addColorStop(1, "#9FDAFC");
    let labels = [];
    let data = [];
    if (graphData && investmentHistory) {
      labels = Object.keys(graphData);
      data = labels.map(month => graphData[month].amount.sum);
    } else if (graphData && repaymentHistory) {
      data = graphData.map(el => {
        labels.push(el.month.split(" ", 1).toString());
        return el.principal;
      });
    }
    return {
      labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: gradient,
          borderColor: gradient,
          pointBorderColor: gradient,
          pointBackgroundColor: gradient,
          fill: false,
          borderWidth: 2,
          hoverBackgroundColor: gradient,
          hoverBorderColor: gradient,
          data
        }
      ]
    };
  };

  return (
    <div className="invesment-sec">
      <div className="invesment-titile">
        <h2>
          {title}
          <span>
            <img
              src={require("../../../../../assets/images/information.png")}
            />
          </span>
        </h2>
      </div>
      <div className="investment-histroy-chart">
        <div className="investment-moth">
          <ul>
            <li
              onClick={() => setActiveMonth("current")}
              className={`${activeMonth === "current" && "active-class"}`}
            >
              Current Month
            </li>
            <li
              onClick={() => setActiveMonth("three")}
              className={`${activeMonth === "three" && "active-class"}`}
            >
              3 Months
            </li>
            <li
              onClick={() => setActiveMonth("six")}
              className={`${activeMonth === "six" && "active-class"}`}
            >
              6 Months
            </li>
            <li
              onClick={() => setActiveMonth("twelve")}
              className={`${activeMonth === "twelve" && "active-class"}`}
            >
              12 Months
            </li>
          </ul>
        </div>
        <div className="investment-chart">
          <Bar
            data={data}
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
                    display: false,
                    ticks: {
                      beginAtZero: true,
                      mirror: true
                    }
                  }
                ]
              },
              tooltips: {
                enabled: false
              }
            }}
          />
        </div>
      </div>
      <div className="invest-histroy">
        <div className="invest-histroy-content">
          <label>Principal Invested</label>
          <span>
            <img src={require("../../../../../assets/images/indiarupee.png")} />
            {totalInvestMent}
          </span>
        </div>
        <div className="invest-histroy-content">
          <label>Count of Loans</label>
          <span>{totalInvestmentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentHistroy;
