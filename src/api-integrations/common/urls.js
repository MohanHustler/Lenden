import { getTaskId } from "./local-storage";

/*
 * Contains all the back end end points.
 */

// URL parameter helper.
const attachParams = (baseUrl, params) => {
  // var resourceUrl = new URL(baseUrl);
  // Object.keys(params).forEach(key =>
  //   resourceUrl.searchParams.append(key, params[key])
  // );

  var url = new URL(baseUrl);
  url.search = new URLSearchParams(params).toString();
  return url;
};

// FireBase API Key.
export const FIREBASE_API_KEY = `AIzaSyAf39HNqk84ORRnFbho8RzH8GY-EX9Yltg`;

// Testing Base URL.
export const BASE_URL = `https://qa.lendenclub.com`;

// Production Base URL.
// export const BASE_URL = `https://lendenclub.com/core/lender_app`;

// Lender Core
export const LENDER_CORE_URL = `${BASE_URL}/core/lender_app`;

// FireBase Deep Link.
export const firebaseDeepLinkUrl = (
  firstName,
  referralCode,
  referralDisplay
) => {
  // return `https://app.lendenclub.com/lender-signup?name=${firstName}&referralCode=${referralCode}&referralDisplay=${referralDisplay}`;
  return `http://lenden-web-app.s3-website.ap-south-1.amazonaws.com/signup?name=${firstName}&referralCode=${referralCode}&referralDisplay=${referralDisplay}`;
};

export const FIREBASE_DYNAMIC_LINK_URL = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${FIREBASE_API_KEY}`;

export const VERIFY_PROSPECT_URL = `${LENDER_CORE_URL}/prospect/verify`;
export const VERIFY_AND_SIGNUP_URL = `${LENDER_CORE_URL}/signup/otp/verify`;

export const SEND_OTP_FOR_LOGIN_URL = `${LENDER_CORE_URL}/login/otp/send`;
export const VERIFY_AND_LOGIN_URL = `${LENDER_CORE_URL}/login/otp/verify`;

export const LOGOUT_URL = `${LENDER_CORE_URL}/logout`;

export const panDetailsUrl = (params = null) => {
  const panDetailsBaseUrl = `${LENDER_CORE_URL}/user/kyc/pan/`;
  if (params) {
    return attachParams(panDetailsBaseUrl, params);
  } else {
    return panDetailsBaseUrl;
  }
};

export const PRICING_PLAN_URL = `${LENDER_CORE_URL}/pricing_plans`;
export const WHY_LENDEN_CLUB_URL = `${LENDER_CORE_URL}/why_lendenclub/`;
export const FAQ_URL = `${LENDER_CORE_URL}/faq`;

export const ACCEPT_LEGAL_AND_COMPLIANCE_URL = `${LENDER_CORE_URL}/legal/authorization/`;
export const CONFIRM_KYC_URL = `${LENDER_CORE_URL}/user/kyc/kyc_confirmation/`;
export const DOCUMENT_UPLOAD_URL = `${LENDER_CORE_URL}/user/lender_document_upload_api/`;
export const ADDRESS_DETAILS_URL = `${LENDER_CORE_URL}/user/kyc/address_details/`;
export const LOCATION_DETAILS_URL = `${BASE_URL}/api/third-party/pin-code`;
export const BANK_DETAILS_URL = `${LENDER_CORE_URL}/bank_account_details/`;
export const BANK_INFO_URL = `${BASE_URL}/api/third-party/ifsc-code`;
export const REFER_AND_EARN_URL = `${LENDER_CORE_URL}/refer_and_earn/`;
export const PROFILE_PICTURE_URL = `${LENDER_CORE_URL}/profile/picture`;

export const ACCOUNT_DETAILS_URL = `${LENDER_CORE_URL}/account/status`;
export const DASHBOARD_URL = `${LENDER_CORE_URL}/user/dashboard/`;
export const PORTFOLIO_URL = `${LENDER_CORE_URL}/user/lender_portfolio/`;
export const PROFILEDETAILS_URL = `${LENDER_CORE_URL}/profile_details/`;
export const NOTIFICATION_URL = `${LENDER_CORE_URL}/notification_list/`;
export const INVESTMENT_PERFORMANCE_URL = `${LENDER_CORE_URL}/investment_performance/`;
export const PEER_TO_PEER_LENDING_ARTICLES = `${LENDER_CORE_URL}/about_peer_to_peer/`;

export const SINGLE_INVEST_URL = `${BASE_URL}/api/invest-api`;
export const BULK_INVEST_URL = `${BASE_URL}/api/staff/bulk_investment`;
export const USER_DETAIL_URL = `${BASE_URL}/api/user`;

export const investDetailsUrl = (params = null) => {
  const investDetailsURL = `${LENDER_CORE_URL}/listings`;
  if (params) {
    var taskId = getTaskId();
    params["task_id"] = taskId;
    return attachParams(investDetailsURL, params);
  }
};

export const feeStatusUrl = () => {
  const feeStatusUrl = `${BASE_URL}/api/registration/fees-payment`;
  var params = {
    task_id: getTaskId()
  };
  return attachParams(feeStatusUrl, params);
};
