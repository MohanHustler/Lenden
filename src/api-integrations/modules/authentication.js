import { POST } from "../common/constants";

import {
  VERIFY_PROSPECT_URL,
  VERIFY_AND_SIGNUP_URL,
  SEND_OTP_FOR_LOGIN_URL,
  VERIFY_AND_LOGIN_URL
} from "../common/urls";

import { apiCall } from "../common/connect";
import { setSignedUserDetails } from "../common/local-storage";

export const verifyProspect = data => {
  return apiCall(POST, VERIFY_PROSPECT_URL, data);
};

export const verifyProspectAndSignUp = data => {
  return apiCall(POST, VERIFY_AND_SIGNUP_URL, data).then(response => {
    if (response != undefined) {
      setSignedUserDetails(response);
      return response;
    }
  });
};

export const sendOtpForLogin = data => {
  return apiCall(POST, SEND_OTP_FOR_LOGIN_URL, data);
};

export const verifyOtpAndLogin = data => {
  return apiCall(POST, VERIFY_AND_LOGIN_URL, data).then(response => {
    if (response != undefined) {
      setSignedUserDetails(response);
      return response;
    }
  });
};
