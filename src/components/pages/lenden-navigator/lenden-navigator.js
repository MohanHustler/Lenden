import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { includes, isEmpty } from "lodash";

import Loader from "../../common/loader";

import { getAccountDetails } from "../../../api-integrations/modules/personal-details";
import {
  ROUTER_PATH_ID_DETAIL,
  ROUTER_PATH_KYC_DETAILS,
  ROUTER_PATH_LEGAL_AUTHORIZATION,
  ROUTER_PATH_ADDRESS,
  ROUTER_PATH_BANK_ACCOUNT,
  ROUTER_PATH_ACCOUNT_FEE
} from "../../../common/application-constants";

const LendenNavigator = props => {
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAccountDetails().then(accountDetails => {
      setLoading(false);
      if (accountDetails != undefined) {
        var checkListObject = JSON.parse(
          accountDetails.check_list.replace(/'/g, '"')
        );
        setCompletedSteps(checkListObject.completed_steps);
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
    if (isEmpty(completedSteps)) {
      return (
        <div>
          <p>Something went wrong please try again later</p>
        </div>
      );
    } else {
      if (!includes(completedSteps, ROUTER_PATH_ID_DETAIL)) {
        return (
          <Redirect
            to={{ pathname: "/iddetail", state: { from: props.location } }}
          />
        );
      } else if (!includes(completedSteps, ROUTER_PATH_ACCOUNT_FEE)) {
        return (
          <Redirect
            to={{
              pathname: "/accountopeningfee",
              state: { from: props.location }
            }}
          />
        );
      } else if (!includes(completedSteps, ROUTER_PATH_LEGAL_AUTHORIZATION)) {
        return (
          <Redirect
            to={{
              pathname: "/legalauthorization",
              state: { from: props.location }
            }}
          />
        );
      } else if (!includes(completedSteps, ROUTER_PATH_KYC_DETAILS)) {
        return (
          <Redirect
            to={{
              pathname: "/kycconfirmation",
              state: { from: props.location }
            }}
          />
        );
      } else if (!includes(completedSteps, ROUTER_PATH_ADDRESS)) {
        return (
          <Redirect
            to={{
              pathname: "/confirmaddress",
              state: { from: props.location }
            }}
          />
        );
      } else if (!includes(completedSteps, ROUTER_PATH_BANK_ACCOUNT)) {
        return (
          <Redirect
            to={{
              pathname: "/connectbank",
              state: { from: props.location }
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        );
      }
    }
  }
};

export default LendenNavigator;
