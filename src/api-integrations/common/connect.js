import * as Toastr from "toastr";

import { CONTENT_TYPE_JSON } from "./constants";

import { getToken, setTaskId, getUserFirstName } from "./local-storage";
import { firebaseDeepLinkUrl, FIREBASE_DYNAMIC_LINK_URL } from "./urls";

const header = {
  "Content-Type": CONTENT_TYPE_JSON,
  accept: CONTENT_TYPE_JSON
};

export function apiCall(requestMethod, url, data) {
  const token = getToken();

  if (token) {
    header["Authorization"] = `Token ${token}`;
  }

  var formData = {
    method: requestMethod,
    headers: header
  };

  if (data != undefined && data != "") {
    var formBody = JSON.stringify(data);
    formData["body"] = formBody;
  }

  return fetch(url, formData)
    .then(response => {
      return response.json().then(responseJson => {
        if (responseJson.code === 1 || responseJson.code === 200) {
          if (responseJson.task_id) {
            setTaskId(responseJson.task_id);
          }
          return responseJson.response;
        } else {
          Toastr.error(responseJson.message, "Failure Response");
        }
      });
    })
    .catch(error => {
      Toastr.error(error, "API Request Failed");
    });
}

export function fileUpload(requestMethod, url, data) {
  const token = getToken();

  var fileHeader = {};
  if (token) {
    fileHeader["Authorization"] = `Token ${token}`;
  }

  var formData = {
    method: requestMethod,
    headers: fileHeader
  };

  if (data != undefined && data != "") {
    const formBody = new FormData();
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        formBody.append(prop, data[prop]);
      }
    }
    formData["body"] = formBody;
  }

  return fetch(url, formData)
    .then(response => {
      return response.json().then(responseJson => {
        if (responseJson.code === 1) {
          if (responseJson.task_id) {
            setTaskId(responseJson.task_id);
          }
          return responseJson.response;
        } else {
          Toastr.error(responseJson.message, "Failure Response");
        }
      });
    })
    .catch(error => {
      Toastr.error(error, "API Request Failed");
    });
}

export function getFireBaseReferralLink(referralCode) {
  const firstName = getUserFirstName();

  const androidIdentifier = "com.innofinsolutions.lendenclub.lender";
  const iosIdentifier = "com.innofinsolutions.lendenclub.lenders";
  const firebaseDynamicLinkPrefix = "lendenclublender.page.link";

  var deepLinkUrl = firebaseDeepLinkUrl(firstName, referralCode, true);

  let headers = {
    "Content-Type": "application/json"
  };
  let body = {
    dynamicLinkInfo: {
      dynamicLinkDomain: firebaseDynamicLinkPrefix,
      link: deepLinkUrl,
      androidInfo: {
        androidPackageName: androidIdentifier
      },
      iosInfo: {
        iosBundleId: iosIdentifier
      }
    }
  };

  return fetch(FIREBASE_DYNAMIC_LINK_URL, {
    headers,
    method: "post",
    body: JSON.stringify(body)
  }).then(res => {
    return res.json().then(json => {
      return json.shortLink;
    });
  });
}
