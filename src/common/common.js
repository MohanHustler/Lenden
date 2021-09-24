/*
 * Contains common custom helper methods.
 */

import { getUserId, getTaskId } from "../api-integrations/common/local-storage";

export const userLoggedIn = () => {
  if (getUserId()) {
    return true;
  } else {
    return false;
  }
};

export const userOnboarding = () => {
  if (getTaskId()) {
    return true;
  } else {
    return false;
  }
};
