import { GET, POST } from "../common/constants";

import {
  PRICING_PLAN_URL,
  WHY_LENDEN_CLUB_URL,
  FAQ_URL,
  ACCEPT_LEGAL_AND_COMPLIANCE_URL,
  feeStatusUrl
} from "../common/urls";

import { apiCall } from "../common/connect";

export const getPricingPlan = () => {
  return apiCall(GET, PRICING_PLAN_URL);
};

export const getWhyLendenClub = () => {
  return apiCall(GET, WHY_LENDEN_CLUB_URL);
};

export const getFaq = () => {
  return apiCall(GET, FAQ_URL);
};

export const acceptLegalAuthorizationAndCompliance = data => {
  return apiCall(POST, ACCEPT_LEGAL_AND_COMPLIANCE_URL, data);
};

export const getFeeStatus = () => {
  return apiCall(GET, feeStatusUrl());
};

export const getFeePaymentLink = () => {
  return apiCall(POST, feeStatusUrl());
};
