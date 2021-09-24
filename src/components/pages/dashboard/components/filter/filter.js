import React, { useState } from "react";
import "./filter.scss";
import Risk from "./component/risk/risk";
import Tenure from "./component/tenure/tenure";
import Loan from "./component/loan/loan";
import Stay from "./component/stay/stay";
import Credit from "./component/credit/credit";

const Filter = ({
  handleCloseFilter,
  riskCategory,
  setRiskCategory,
  riskLength,
  setRiskLength,
  cibilScore,
  setCibilScore,
  cibilScoreLength,
  setCibilScoreLength,
  fetchInvestData,
  tenure,
  setTenure,
  tenureLength,
  setTenureLength,
  funded,
  setFunded,
  fundedLength,
  setFundedLength,
  loanPurpose,
  setLoanPurpose,
  loanPurposeLength,
  setLoanPurposeLength
}) => {
  const clearHandle = () => {
    setCibilScore([]);
    setCibilScoreLength(0);
    setRiskCategory([]);
    setRiskLength(0);
  };
  const applyFilter = () => {
    handleCloseFilter();
    if (
      riskLength ||
      cibilScoreLength ||
      tenureLength ||
      loanPurposeLength ||
      fundedLength
    ) {
      let risk_category = riskCategory.join(",").toUpperCase();
      let cibil_score = cibilScore.join(",").toUpperCase();
      let tenureData = tenure.join(",");
      let loan_purpose = loanPurpose.join(",").toUpperCase();
      let fundedData = funded.join(",").toUpperCase();
      const filterData = {
        loan_purpose,
        cibil_score,
        funded: fundedData,
        risk_category,
        task_id: "1",
        tenure: tenureData,
        l: "10",
        o: 1
      };
      fetchInvestData(filterData);
    }
  };
  return (
    <div className="filter-sec">
      <div className="filter-search">
        <label>Filter your list</label>
        <a
          onClick={() => {
            handleCloseFilter();
          }}
        >
          <img src={require("../../../../../assets/images/close.png")} />
        </a>
      </div>
      <Risk
        riskCategory={riskCategory}
        setRiskCategory={setRiskCategory}
        riskLength={riskLength}
        setRiskLength={setRiskLength}
      />
      <Tenure
        tenure={tenure}
        setTenure={setTenure}
        tenureLength={tenureLength}
        setTenureLength={setTenureLength}
      />
      <Loan
        loanPurpose={loanPurpose}
        setLoanPurpose={setLoanPurpose}
        loanPurposeLength={loanPurposeLength}
        setLoanPurposeLength={setLoanPurposeLength}
      />
      <Stay
        funded={funded}
        setFunded={setFunded}
        fundedLength={fundedLength}
        setFundedLength={setFundedLength}
      />
      <Credit
        cibilScore={cibilScore}
        setCibilScore={setCibilScore}
        cibilScoreLength={cibilScoreLength}
        setCibilScoreLength={setCibilScoreLength}
      />
      <div className="filter-select">
        <a onClick={clearHandle} className="gry-btn">
          Clear all
        </a>
        <a onClick={applyFilter} className="blue-btn">
          Apply
        </a>
      </div>
    </div>
  );
};

export default Filter;
