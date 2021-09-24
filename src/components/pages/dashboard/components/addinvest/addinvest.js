import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";

import * as Toastr from "toastr";

import "./addinvest.scss";

import {
  addSingleInvest,
  addBulkInvest
} from "../../../../../api-integrations/modules/invest-details";

const Addinvest = ({ selectedLoans }) => {
  const [initialAmount, setInitialAmount] = useState(500);

  const clickInvestAmount = () => {
    if (selectedLoans.length === 1) {
      const singleInvestDetails = {
        required_loan_id: selectedLoans[0].loan_id,
        investment_amount: initialAmount
      };

      addSingleInvest(singleInvestDetails).then(response => {
        if (response != undefined) {
          Toastr.success(response, "Single Invest Status");
        }
      });
    } else if (selectedLoans.length > 1) {
      const bulkInvestDetails = {
        lenders_list: ["deepeshkarkee@gmail.ldcc"],
        required_loan_id_list: ["57ALL9Y2"]
      };

      addBulkInvest(bulkInvestDetails).then(response => {
        if (response != undefined) {
          Toastr.success("Investment saved successfully", "Bulk Invest Status");
        }
      });
    }
  };

  return (
    <div>
      <div className="invest-now">
        <div className="invest-tabel">
          <tr>
            <th>Name</th>
            <th>Loan Id</th>
            <th>Remaining Amount</th>
            <th>Invested Amount</th>
          </tr>
          {selectedLoans.map(loan => {
            return (
              <tr>
                <td>{loan.name}</td>
                <td>{loan.loan_id}</td>
                <td>
                  <span className="rube-img">
                    <img
                      src={require("../../../../../assets/images/lenden/rupe.png")}
                    />
                  </span>
                  {loan.remaining_amount}
                </td>
                <td>
                  <div className="sub-select">
                    <span className="sub-img">
                      <img
                        onClick={() =>
                          setInitialAmount(parseInt(initialAmount) - 500)
                        }
                        src={require("../../../../../assets/images/lenden/sub.png")}
                      />
                    </span>
                    <span>500</span>
                    <span className="sub-img">
                      <img
                        onClick={() =>
                          setInitialAmount(parseInt(initialAmount) + 500)
                        }
                        src={require("../../../../../assets/images/lenden/add.png")}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </div>
        <div className="invest-add">
          <div className="custom-input">
            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={initialAmount}
              onChange={e => setInitialAmount(e.target.value)}
            />
          </div>
          <div className="invest-btn">
            <a onClick={clickInvestAmount} className="blue-btn">
              Invest Now
            </a>
          </div>
        </div>
        <div className="invest-content">
          <p>
            Facilitation Fee applicable on this investment is 3%. For further
            detail click
            <label>
              <a
                target="_blank"
                href="https://qa-app.lendenclub.com/facilitation-fee"
              >
                {" "}
                here.
              </a>
            </label>
          </p>
          <p>
            By clicking INVEST, I authorise LenDenClub to transfer my committed
            loan amount to borrower's bank account after loan agreement is
            signed by the borrower.
          </p>
          <p>
            To view detailed agreement of this transaction click{" "}
            <label>
              <a
                target="_blank"
                href="https://s3-ap-southeast-1.amazonaws.com/lenden-static-files/react-images/Sample-Agreement.pdf"
              >
                here.
              </a>
            </label>
          </p>
        </div>
      </div>
      </div>
  );
};
export default Addinvest;
