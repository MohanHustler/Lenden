import React, { useState, useEffect } from "react";

import Slider from "react-slick";
import { Link } from "react-router-dom";


import "./top_loans.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getInvestDetails } from "../../../../../api-integrations/modules/landing-apis";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: 230,
        width: 54,
        display: "block",
        boxSizing: "border-box"
        // backgroundColor: "rgba(255,255,255,0.5)"
      }}
      onClick={onClick}
    >
      <div className="arrow-img">
        <img
          src={require("../../../../../assets/images/right-arrow.png")}
          alt="logo"
        ></img>
      </div>
    </div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: 230,
        width: 54,
        display: "block",
        boxSizing: "border-box"
        // backgroundColor: "rgba(255,255,255,0.5)"
      }}
      onClick={onClick}
    >
      <div className="arrow-img">
        <img
          src={require("../../../../../assets/images/left-arrow.png")}
          alt="logo"
        ></img>
      </div>
    </div>
  );
}
const TopLoans = () => {
  const [topTenInvest, setTopTenInvest] = useState([]);
  const [loanCount, setLoanCount] = useState(0);

  useEffect(() => {
    fetchInvestDetails();
  }, []);

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
        setLoanCount(allInvests.record_count);
        setTopTenInvest(allInvests.loans.slice(0, 10));
      }
    });
  };
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
        {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="top-loans">
      <div className="dashboard-secondary-heading">
        <h1>Available Loans</h1>
        <span></span>
      </div>
      <div className="top-loans-card-wrap">
        <Slider {...settings}>
          {topTenInvest.map((loan, index) => (
            <div className="top-loans-card" key={index}>
              <div className="top-loans-card-left top-loans-card-inner">
                <ul>
                  <li>
                    <label>Name</label>
                    <span>{loan.user.first_name}</span>
                  </li>
                  <li>
                    <label>Loan ID</label>
                    <span>{loan.required_loan_id}</span>
                  </li>
                  <li>
                    <label>Interest Rate</label>
                    <span>{loan.interest_rate}</span>
                  </li>
                </ul>
              </div>
              <div className="top-loans-card-right top-loans-card-inner">
                <ul>
                  <li>
                    <label>Loan Amount</label>
                    <span>{loan.amount}</span>
                  </li>
                  <li>
                    <label>Remaining Amount</label>
                    <span>{loan.amount_remaining}</span>
                  </li>
                  <li>
                    <label>Tenure</label>
                    <span>{loan.tenure}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="top-loans-notes">
        <p>
          You can now invest in all <span>{loanCount}</span> these loans in just
          one tap
        </p>
        <Link to="/invest" className="green-button"> Invest Now</Link>
      </div>
    </div>
  );
};
export default TopLoans;
