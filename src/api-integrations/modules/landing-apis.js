import { GET } from "../common/constants";

import {
  DASHBOARD_URL,
  PORTFOLIO_URL,
  investDetailsUrl,
  PROFILEDETAILS_URL,
  NOTIFICATION_URL,
  INVESTMENT_PERFORMANCE_URL,
  PEER_TO_PEER_LENDING_ARTICLES,
  USER_DETAIL_URL
} from "../common/urls";

import { apiCall } from "../common/connect";

export const getDashboardDetails = () => {
  return apiCall(GET, DASHBOARD_URL);
};

export const getPortfolioDetails = () => {
  return apiCall(GET, PORTFOLIO_URL);
};

export const getInvestDetails = params => {
  var url = investDetailsUrl(params);
  return apiCall(GET, url);
};

export const getProfileDetails = () => {
  return apiCall(GET, PROFILEDETAILS_URL);
};

export const getAllNotifications = () => {
  return apiCall(GET, NOTIFICATION_URL);
};

export const getInvestmentPerformance = () => {
  return apiCall(GET, INVESTMENT_PERFORMANCE_URL);
};

export const getPeerToPeerLendingArticles = () => {
  return apiCall(GET, PEER_TO_PEER_LENDING_ARTICLES);
};

export const getUserDetails = () => {
  return apiCall(GET, USER_DETAIL_URL);
};
