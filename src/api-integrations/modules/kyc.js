import { POST } from "../common/constants";

import { CONFIRM_KYC_URL, DOCUMENT_UPLOAD_URL } from "../common/urls";

import { apiCall, fileUpload } from "../common/connect";

export const confirmKyc = data => {
  return apiCall(POST, CONFIRM_KYC_URL, data);
};

export const uploadDocuments = data => {
  return fileUpload(POST, DOCUMENT_UPLOAD_URL, data);
};
