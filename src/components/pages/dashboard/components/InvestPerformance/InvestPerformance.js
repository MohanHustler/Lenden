import React, { useState, useEffect } from "react";

import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-annotation";

import "./invest-performance.scss";

import { isEmpty } from "lodash";

import Loader from "../../../../common/loader";

import {
  INVESTMENT_PERFORMANCE_LABELS_WITHOUT_USER,
  INVESTMENT_PERFORMANCE_LABELS_WITH_USER
} from "../../../../../common/application-constants";
import { getInvestmentPerformance } from "../../../../../api-integrations/modules/landing-apis";

const InvestPerformance = props => {
  const [investmentPerformance, setInvestmentPerformance] = useState({});

  useEffect(() => {
    getInvestmentPerformance().then(investmentPerformance => {
      if (investmentPerformance != undefined) {
        setInvestmentPerformance(investmentPerformance);
      }
    });
  }, []);

  const data = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, props.xGradient);
    gradient.addColorStop(1, props.yGradient);

    var inflation = parseFloat(
      investmentPerformance.inflation.replace("%", "")
    );
    var mf = parseFloat(investmentPerformance.mf.replace("%", ""));
    var fd = parseFloat(investmentPerformance.fd.replace("%", ""));
    var lenDenClub = parseFloat(
      investmentPerformance.lendenclub.replace("%", "")
    );
    var graphData = [mf, fd, lenDenClub];
    var dataLabels = INVESTMENT_PERFORMANCE_LABELS_WITHOUT_USER;

    if (props.showUserData) {
      graphData.push(inflation);
      dataLabels = INVESTMENT_PERFORMANCE_LABELS_WITH_USER;
    }

    return {
      labels: dataLabels,
      datasets: [
        {
          label: "Investment Performance",
          backgroundColor: gradient,
          borderColor: gradient,
          pointBorderColor: gradient,
          pointBackgroundColor: gradient,
          fill: false,
          borderWidth: 2,
          hoverBackgroundColor: gradient,
          hoverBorderColor: gradient,
          data: graphData
        }
      ]
    };
  };

  if (isEmpty(investmentPerformance)) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    var inflationPoint = parseFloat(
      investmentPerformance.inflation.replace("%", "")
    );

    return (
      <div className="invest-performance">
        <div className="dashboard-secondary-heading">
          {props.showUserData ? (
            <>
              <h1>Your Investment </h1>
              <label> Performance</label>
            </>
          ) : (
            <>
              <h1>Investment </h1>
              <label> Performance</label>
            </>
          )}

          <span>
            <img
              src={require("../../../../../assets/images/information.png")}
            />
          </span>
        </div>
        <HorizontalBar
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
            tooltips: {
              enabled: true
            },
            annotation: {
              annotations: [
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  borderDash: [8, 12],
                  value: inflationPoint,
                  borderColor: props.dashLineColor,
                  borderWidth: 1
                }
              ]
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                    display: false
                  }
                }
              ]
            }
          }}
        />
        <p>
          Your portfolio can do better. Keep your investments for a longer
          tenure to increase your ROI.
        </p>
      </div>
    );
  }
};

export default InvestPerformance;
