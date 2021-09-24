import React, { useState, useEffect } from "react";

import "./invest.scss";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../layout/header/header";
import Loader from "../../common/loader";

import InvestRow from "./invest-row";

import { getInvestDetails } from "../../../api-integrations/modules/landing-apis";
import Addinvest from "../dashboard/components/addinvest/addinvest";

import Filter from "../dashboard/components/filter/filter";

import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const DialogContent = withStyles(theme => ({}))(MuiDialogContent);

const theme = createMuiTheme();

const Invest = () => {
  const [loading, setLoading] = useState(false);
  const [allInvests, setAllInvests] = useState([]);
  const [loans, setLoans] = useState([]);
  const [recordCount, setRecordCount] = useState("");
  const [showInvestButton, setShowInvestButton] = useState(false);
  const [openInvestPopup, setOpenInvestPopup] = useState(false);
  const [emptyRow, setEmptyRow] = useState([]);
  const [investLength, setInvestLength] = useState(0);

  const [filterOpen, setFilterOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);

  const [cibilScore, setCibilScore] = useState([]);
  const [cibilScoreLength, setCibilScoreLength] = useState(0);

  const [riskCategory, setRiskCategory] = useState([]);
  const [riskLength, setRiskLength] = useState(0);

  const [funded, setFunded] = useState([]);
  const [fundedLength, setFundedLength] = useState(0);

  const [tenure, setTenure] = useState([]);
  const [tenureLength, setTenureLength] = useState(0);

  const [loanPurpose, setLoanPurpose] = useState([]);
  const [loanPurposeLength, setLoanPurposeLength] = useState(0);

  const [offset, setOffSet] = useState(0);
  const [investTotalPage, setInvestTotalPage] = useState(0);

  const [filterData, setFilterData] = useState({
    l: "10",
    o: 1
  });

  const handleClickFilter = () => {
    setFilterOpen(true);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleClickInvest = () => {
    setInvestOpen(true);
  };

  const handleCloseInvest = () => {
    setInvestOpen(false);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      right: "15px!important",
      bottom: "initial!important",
      top: "70px!important",
      left: "initial!important"
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    fetchInvestData(filterData);
  }, []);

  const fetchInvestData = filterData => {
    setFilterData(filterData);
    setLoading(true);
    getInvestDetails(filterData).then(allInvests => {
      setLoading(false);
      if (allInvests != undefined) {
        setAllInvests(allInvests);
        setLoans(allInvests.loans);
        setRecordCount(allInvests.record_count);
        setInvestTotalPage(Math.ceil(allInvests.record_count / 10));
      }
    });
  };

  useEffect(() => {
    if (emptyRow.length) {
      setShowInvestButton(true);
    } else {
      setShowInvestButton(false);
    }
  }, [emptyRow]);

  const updatePagination = (e, offset) => {
    var dummyFilterData = filterData;
    var nextPageNumber = offset + 1;
    dummyFilterData["o"] = nextPageNumber;
    e.preventDefault();
    setOffSet(offset);
    fetchInvestData(dummyFilterData);
  };

  const handleSingleInvest = () => {
    setOpenInvestPopup(true);
    setShowInvestButton(false);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <>
        <div className="invest-wrapper">
          <Header />
          <div className="invest-container">
            <div className="common-table-heading">
              <h2>Browse All Loans</h2>
              <span onClick={handleClickFilter}>
                <img
                  src={require("../../../assets/images/invest/filter.png")}
                />
              </span>
            </div>
            <div className="common-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Loan Id</th>
                    <th>Interest Rate</th>
                    <th>Credit Score</th>
                    <th> Tenure</th>
                    <th>Purpose</th>
                    <th>Requested </th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(userLoan => {
                    return (
                      <InvestRow
                        setShowInvestButton={setShowInvestButton}
                        setInvestLength={setInvestLength}
                        emptyRow={emptyRow}
                        setEmptyRow={setEmptyRow}
                        key={userLoan.required_loan_id}
                        userLoan={userLoan}
                        amountRemaining={userLoan.amount_remaining}
                        tenure={userLoan.tenure}
                        loanId={userLoan.required_loan_id}
                        userName={userLoan.user.first_name}
                        purpose={userLoan.purpose}
                        creditScore={userLoan.credit_details.credit_score}
                        intresetRate={userLoan.interest_rate}
                        amount={userLoan.amount}
                        gender={userLoan.user.gender}
                        age={userLoan.user.age}
                        maritalStatus={userLoan.user.marital_status}
                        user={userLoan.user}
                        income={userLoan.user_info.monthly_income}
                      />
                    );
                  })}
                </tbody>
              </table>

              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Pagination
                  limit={1}
                  offset={offset}
                  total={investTotalPage}
                  onClick={(e, offset) => {
                    updatePagination(e, offset);
                  }}
                />
              </MuiThemeProvider>
            </div>
            {showInvestButton ? (
              emptyRow.length === 1 ? (
                <div className="invest-btn">
                  <a onClick={handleClickInvest} className="blue-btn width">
                    Invest Now
                  </a>
                </div>
              ) : (
                <div className="invest-btn">
                  <a
                    onClick={handleClickInvest}
                    className="blue-btn width"
                  >{`Bulk Invest(${emptyRow.length} rows selected)`}</a>
                </div>
              )
            ) : (
              ""
            )}

            {/* {openInvestPopup && <Addinvest selectedLoans={emptyRow} />} */}
          </div>
        </div>

        {/* Funds Popup */}
        <Dialog
          className={classes.root}
          onClose={handleCloseFilter}
          open={filterOpen}
        >
          <DialogContent>
            <Filter
              fetchInvestData={fetchInvestData}
              handleCloseFilter={handleCloseFilter}
              riskCategory={riskCategory}
              setRiskCategory={setRiskCategory}
              riskLength={riskLength}
              setRiskLength={setRiskLength}
              cibilScore={cibilScore}
              setCibilScore={setCibilScore}
              cibilScoreLength={cibilScoreLength}
              setCibilScoreLength={setCibilScoreLength}
              tenure={tenure}
              setTenure={setTenure}
              tenureLength={tenureLength}
              setTenureLength={setTenureLength}
              funded={funded}
              setFunded={setFunded}
              fundedLength={fundedLength}
              setFundedLength={setFundedLength}
              loanPurpose={loanPurpose}
              setLoanPurpose={setLoanPurpose}
              loanPurposeLength={loanPurposeLength}
              setLoanPurposeLength={setLoanPurposeLength}
            />
          </DialogContent>
        </Dialog>

        {/* Invest Popup */}
        <Dialog onClose={handleCloseInvest} open={investOpen}>
          <DialogContent>
            <Addinvest selectedLoans={emptyRow} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
};

export default Invest;
