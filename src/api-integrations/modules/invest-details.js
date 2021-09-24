import { POST } from "../common/constants";

import { SINGLE_INVEST_URL, BULK_INVEST_URL } from "../common/urls";

import { apiCall } from "../common/connect";

export const addSingleInvest = data => {
  return apiCall(POST, SINGLE_INVEST_URL, data);
};

export const addBulkInvest = data => {
  return apiCall(POST, BULK_INVEST_URL, data);
};
