import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import * as Toastr from "toastr";

import "../legal-authorization/legal-authorization.scss";

import {
  GENDER_MALE,
  GENDER_FEMALE,
  MARITIAL_STATUS_SINGLE,
  MARITIAL_STATUS_MARRIED,
  MARITIAL_STATUS_WIDOWED_OR_DIVOCE,
  ADDRESS_TYPE_PERMANENT,
  ADDRESS_TYPE_COMMUNICATION,
  ADDRESS_PROOF_AADHAR,
  ADDRESS_PROOF_VOTER_ID,
  ADDRESS_PROOF_PASSPORT
} from "../../../common/application-constants";

import { getTaskId } from "../../../api-integrations/common/local-storage";
import {
  confirmKyc,
  uploadDocuments
} from "../../../api-integrations/modules/kyc";

const KycConfirmation = () => {
  let history = useHistory();
  const taskId = getTaskId();

  const [gender, setGender] = useState(GENDER_MALE);
  const [maritialStatus, setMaritialStatus] = useState(MARITIAL_STATUS_SINGLE);
  const [addressProofName, setAddressProofName] = useState(
    ADDRESS_PROOF_AADHAR
  );
  const [addressType, setAddressType] = useState(ADDRESS_TYPE_PERMANENT);
  const [showGeneralDetail, setShowGeneralDetail] = useState(true);
  const [showAddressProof, setShowAddressProof] = useState(false);
  const [proofFrontSide, setProofFrontSide] = useState("");
  const [proofBackSide, setProofBackSide] = useState("");

  const acceptAgreementCollapse = () =>
    setShowGeneralDetail(!showGeneralDetail);
  const toggleAddressProof = () => setShowAddressProof(!showAddressProof);

  const confirmKycAndUploadDocuments = () => {
    var userDetails = {
      gender: gender,
      marital_status: maritialStatus,
      address_type: addressType,
      task_id: taskId
    };

    confirmKyc(userDetails).then(response => {
      if (response != undefined) {
        uploadProofDocuments();
      }
    });
  };

  const uploadProofDocuments = () => {
    var fileDetails = {
      task_id: taskId
    };

    if (addressProofName === ADDRESS_PROOF_AADHAR)
      switch (addressProofName) {
        case ADDRESS_PROOF_AADHAR:
          if (proofFrontSide) {
            fileDetails["aadhaar_front"] = proofFrontSide;
            fileDetails["field_name"] = "aadhaar_front";
          }

          if (proofBackSide) {
            fileDetails["aadhaar_back"] = proofBackSide;
          }
          break;
        case ADDRESS_PROOF_VOTER_ID:
          if (proofFrontSide) {
            fileDetails["pan_front"] = proofFrontSide;
            fileDetails["field_name"] = "pan_front";
          }

          if (proofBackSide) {
            fileDetails["pan_back"] = proofBackSide;
          }
          break;
        case ADDRESS_PROOF_PASSPORT:
          if (proofFrontSide) {
            fileDetails["passport_front"] = proofFrontSide;
            fileDetails["field_name"] = "passport_front";
          }

          if (proofBackSide) {
            fileDetails["passport_back"] = proofBackSide;
          }
          break;
        default:
          break;
      }

    uploadDocuments(fileDetails).then(response => {
      if (response != undefined) {
        Toastr.success("Upload document successfully", "Upload Status");
        history.push("/confirmaddress");
      }
    });
  };

  return (
    <div>
      <div className="leagal-auth-sec">
        <div className="leagal-auth">
          <div className="leagal-auth-image">
            <div className="leagal-auth-image-container">
              <img src={require("../../../assets/images/kyc/livekyc.png")} />
            </div>
          </div>
          <div className="leagal-auth-accept-sec">
            <div className="leagal-auth-accept-desc-sec">
              <div className="leagal-auth-accept-content">
                <h2>KYC Confirmation</h2>
                <p>Please share the following KYC details</p>
              </div>
              <div className="auth-letter">
                <div
                  className="auth-letter-collaps"
                  onClick={acceptAgreementCollapse}
                >
                  <label>General Details</label>
                  <span>
                    <img
                      src={require("../../../assets/images/lenden/down-arrow.png")}
                    />
                  </span>
                </div>
                {showGeneralDetail ? (
                  <div className="kyc-select-from">
                    <div className="kyc-select-option">
                      <h2>Gender</h2>
                      <div className="kyc-selected-option">
                        <label
                          className={
                            gender === GENDER_MALE ? "active-class" : ""
                          }
                          onClick={() => {
                            setGender(GENDER_MALE);
                          }}
                        >
                          Male
                        </label>
                        <label
                          className={
                            gender === GENDER_FEMALE ? "active-class" : ""
                          }
                          onClick={() => {
                            setGender(GENDER_FEMALE);
                          }}
                        >
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="kyc-select-option">
                      <h2>Maritial Status</h2>
                      <div className="kyc-selected-option">
                        <label
                          className={
                            maritialStatus === MARITIAL_STATUS_SINGLE
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setMaritialStatus(MARITIAL_STATUS_SINGLE);
                          }}
                        >
                          Single
                        </label>
                        <label
                          className={
                            maritialStatus === MARITIAL_STATUS_MARRIED
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setMaritialStatus(MARITIAL_STATUS_MARRIED);
                          }}
                        >
                          Married
                        </label>
                        <label
                          className={
                            maritialStatus === MARITIAL_STATUS_WIDOWED_OR_DIVOCE
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setMaritialStatus(
                              MARITIAL_STATUS_WIDOWED_OR_DIVOCE
                            );
                          }}
                        >
                          Widowed/Divorce
                        </label>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="auth-letter">
                <div
                  className="auth-letter-collaps"
                  onClick={toggleAddressProof}
                >
                  <label>Address Proof</label>
                  <span>
                    <img
                      src={require("../../../assets/images/lenden/down-arrow.png")}
                    />
                  </span>
                </div>
                {showAddressProof ? (
                  <div className="kyc-select-from">
                    <div className="kyc-select-option">
                      <h2>Upload Address Proof</h2>
                      <div className="kyc-selected-option">
                        <label
                          className={
                            addressProofName === ADDRESS_PROOF_AADHAR
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setAddressProofName(ADDRESS_PROOF_AADHAR);
                          }}
                        >
                          Aadhar Card
                        </label>
                        <label
                          className={
                            addressProofName === ADDRESS_PROOF_VOTER_ID
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setAddressProofName(ADDRESS_PROOF_VOTER_ID);
                          }}
                        >
                          Voter ID
                        </label>
                        <label
                          className={
                            addressProofName === ADDRESS_PROOF_PASSPORT
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setAddressProofName(ADDRESS_PROOF_PASSPORT);
                          }}
                        >
                          Passport
                        </label>
                      </div>
                      <div className="scan-image">
                        <div className="scan-card">
                          <div className="chooseflie-sec">
                            <input
                              type="file"
                              className="chooseflie"
                              onChange={e => {
                                setProofFrontSide(e.target.files[0]);
                              }}
                            />
                          </div>
                          <div className="scan-card-img">
                            <img
                              src={require("../../../assets/images/kyc/focus.png")}
                            />
                          </div>
                          <div className="scan-card-content">
                            {proofFrontSide ? (
                              <p> {proofFrontSide.name} </p>
                            ) : (
                              <p>Select front side</p>
                            )}
                          </div>
                        </div>
                        <div className="scan-card">
                          <div className="chooseflie-sec">
                            <input
                              type="file"
                              className="chooseflie"
                              onChange={e => {
                                setProofBackSide(e.target.files[0]);
                              }}
                            />
                          </div>
                          <div className="scan-card-img">
                            <img
                              src={require("../../../assets/images/kyc/focus.png")}
                            />
                          </div>
                          <div className="scan-card-content">
                            {proofBackSide ? (
                              <p>{proofBackSide.name}</p>
                            ) : (
                              <p>Select back side</p>
                            )}
                            <label>(optional)</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kyc-select-option">
                      <h2>Select Address Type</h2>
                      <div className="kyc-selected-option">
                        <label
                          className={
                            addressType === ADDRESS_TYPE_PERMANENT
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setAddressType(ADDRESS_TYPE_PERMANENT);
                          }}
                        >
                          Permanent
                        </label>
                        <label
                          className={
                            addressType === ADDRESS_TYPE_COMMUNICATION
                              ? "active-class"
                              : ""
                          }
                          onClick={() => {
                            setAddressType(ADDRESS_TYPE_COMMUNICATION);
                          }}
                        >
                          Communication
                        </label>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="proceed-btn">
                <button
                  className="green-btn"
                  onClick={() => {
                    confirmKycAndUploadDocuments();
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycConfirmation;
