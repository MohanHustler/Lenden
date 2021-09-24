import { PUT, GET, POST } from "../common/constants";

import {
  panDetailsUrl,
  ADDRESS_DETAILS_URL,
  BANK_DETAILS_URL,
  ACCOUNT_DETAILS_URL,
  LOCATION_DETAILS_URL,
  BANK_INFO_URL,
  REFER_AND_EARN_URL,
  PROFILE_PICTURE_URL
} from "../common/urls";

import { apiCall } from "../common/connect";

export const getAccountDetails = () => {
  return apiCall(GET, ACCOUNT_DETAILS_URL);
};

export const addPanDetails = (data, params) => {
  var url = panDetailsUrl(params);
  return apiCall(PUT, url, data);
};

export const getPanDetails = () => {
  var url = panDetailsUrl();
  return apiCall(GET, url);
};

export const addAddressDetails = data => {
  return apiCall(POST, ADDRESS_DETAILS_URL, data);
};

export const getCommunicationAddress = () => {
  return apiCall(GET, ADDRESS_DETAILS_URL);
};

export const addBankDetails = data => {
  return apiCall(POST, BANK_DETAILS_URL, data);
};

export const getBankDetails = () => {
  return apiCall(GET, BANK_DETAILS_URL);
};

export const getLocationDetails = data => {
  return apiCall(POST, LOCATION_DETAILS_URL, data);
};

export const getBankInfo = data => {
  return apiCall(POST, BANK_INFO_URL, data);
};

export const referAndEarn = data => {
  return apiCall(POST, REFER_AND_EARN_URL, data);
};

export const getProfilePicture = data => {
  return apiCall(GET, PROFILE_PICTURE_URL, data);
};