/*
 * Helper methods to access local cookie storage.
 */

import Cookies from "universal-cookie";

import {
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_EMAIL_ID,
  LOCAL_STORAGE_MOBILE_NUMBER,
  LOCAL_STORAGE_TASK_ID,
  LOCAL_STORAGE_USER_TYPE,
  LOCAL_STORAGE_FIRST_NAME
} from "../../common/application-constants";

const cookies = new Cookies();

// Testing User Credentials.
// User 1:
// cookies.set(LOCAL_STORAGE_TOKEN, "889bfa146317fd156692b214807242b136aa32af");
// cookies.set(LOCAL_STORAGE_USER_ID, "ZHV0U5E5X1");
// cookies.set(LOCAL_STORAGE_EMAIL_ID, "ptl.bhavin@yahoo.ldcc");
// cookies.set(LOCAL_STORAGE_MOBILE_NUMBER, "9920725885");

// User 2:
// cookies.set(LOCAL_STORAGE_TOKEN, "5ad3950cc1e44f99a0596c6fb6e36f5e332241c7");
// cookies.set(LOCAL_STORAGE_USER_ID, "6FALUUX6EL");
// cookies.set(LOCAL_STORAGE_EMAIL_ID, "deepeshkarkee@gmail.ldcc");
// cookies.set(LOCAL_STORAGE_MOBILE_NUMBER, "9920735197");

// User 3:
// cookies.set(LOCAL_STORAGE_TOKEN, "642562f1b62d3411e824d5d504e9f51340cda7f5");
// cookies.set(LOCAL_STORAGE_USER_ID, "7A0S0EPICC");
// cookies.set(LOCAL_STORAGE_EMAIL_ID, "dipeshtest4@gmail.com ");
// cookies.set(LOCAL_STORAGE_MOBILE_NUMBER, "6001001004");
// cookies.set(LOCAL_STORAGE_FIRST_NAME, "Dipesh test4");

// User 4:
cookies.set(LOCAL_STORAGE_TOKEN, "70b8b5a1d12694aacb9296d8cb2775f64530bd67");
cookies.set(LOCAL_STORAGE_USER_ID, "RPF2AOTI16");
cookies.set(LOCAL_STORAGE_EMAIL_ID, "deepesh.karke.e@gmail.com");
cookies.set(LOCAL_STORAGE_MOBILE_NUMBER, "9920735197");
cookies.set(LOCAL_STORAGE_TASK_ID, "205862");
cookies.set(LOCAL_STORAGE_FIRST_NAME, "Inku Khanal");

export const setSignedUserDetails = userDetails => {
  cookies.set(LOCAL_STORAGE_EMAIL_ID, userDetails["email"]);
  cookies.set(LOCAL_STORAGE_MOBILE_NUMBER, userDetails["mobile_number"]);

  if (userDetails["user_id"]) {
    cookies.set(LOCAL_STORAGE_USER_ID, userDetails["user_id"]);
  }

  if (userDetails["token"]) {
    cookies.set(LOCAL_STORAGE_TOKEN, userDetails["token"]);
  }

  if (userDetails["task_id"]) {
    cookies.set(LOCAL_STORAGE_TASK_ID, userDetails["task_id"]);
  }

  if (userDetails["type"]) {
    cookies.set(LOCAL_STORAGE_USER_TYPE, userDetails["type"]);
  }

  if (userDetails["first_name"]) {
    cookies.set(LOCAL_STORAGE_FIRST_NAME, userDetails["first_name"]);
  }
};

export const setTaskId = taskId => {
  cookies.set(LOCAL_STORAGE_TASK_ID, taskId);
};

export const getTaskId = () => {
  return cookies.get(LOCAL_STORAGE_TASK_ID);
};

export const getToken = () => {
  return cookies.get(LOCAL_STORAGE_TOKEN);
};

export const getUserId = () => {
  return cookies.get(LOCAL_STORAGE_USER_ID);
};

export const setUserMobileNumber = mobileNumber => {
  cookies.set(LOCAL_STORAGE_MOBILE_NUMBER, mobileNumber);
};

export const getUserEmail = () => {
  return cookies.get(LOCAL_STORAGE_EMAIL_ID);
};

export const getUserMobileNumber = () => {
  return cookies.get(LOCAL_STORAGE_MOBILE_NUMBER);
};

export const getUserType = () => {
  return cookies.get(LOCAL_STORAGE_USER_TYPE);
};

export const getUserFirstName = () => {
  return cookies.get(LOCAL_STORAGE_FIRST_NAME);
};

export const clearLocalStorage = () => {
  cookies.remove(LOCAL_STORAGE_TOKEN);
  cookies.remove(LOCAL_STORAGE_USER_ID);
  cookies.remove(LOCAL_STORAGE_EMAIL_ID);
  cookies.remove(LOCAL_STORAGE_MOBILE_NUMBER);
  cookies.remove(LOCAL_STORAGE_TASK_ID);
};
