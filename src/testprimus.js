import { PrimusZKTLS } from "@primuslabs/zktls-js-sdk";
import { targetTemplateID } from "./config/constants";
const userAddress = "";
//Initialization parameters
const primusZKTLS = new PrimusZKTLS();
const appId = "0x17ae11d76b72792478d7b7bcdc76da9574ab3cf8";
const appSecret =
  "0xafa01caf44f07d2b21bc5e2bde1de2a8ba56f33ac2e223169f99634f57d049b5";

let platformDevice = "pc";
if (navigator.userAgent.toLocaleLowerCase().includes("android")) {
  platformDevice = "android";
} else if (navigator.userAgent.toLocaleLowerCase().includes("iphone")) {
  platformDevice = "ios";
}

primusZKTLS
  .init(appId, appSecret, { platform: platformDevice /*, env: "development"*/ })
  .then(
    (result) => {
      console.log("platformDevice=", platformDevice, navigator.userAgent);
      console.log("primusProof initAttestaionResult=", result);
    },
    (error) => {
      console.log(error);
    }
  );

export async function primusProofTest(attTemplateID) {
  //Generate attestation request
  const request = primusZKTLS.generateRequestParams(attTemplateID, userAddress);

  if (attTemplateID === targetTemplateID) {
    request.setComputeMode("nonecomplete");
    const additionParams = JSON.stringify({
      binanceBaseAsset: "BNB",
      rowForBrevis: 10,
    });
    request.setAdditionParams(additionParams);
  }

  // Transfer request object to string
  const requestStr = request.toJsonString();

  //sign request
  const signedRequestStr = await primusZKTLS.sign(requestStr);
  //log signedRequestStr
  console.log("signedRequestStr=", signedRequestStr);
  //start attestation process
  let attestation;
  //if (platformDevice === "pc") {
  attestation = await primusZKTLS.startAttestation(signedRequestStr);
  console.log("attestation=", attestation);

  let completeHttpResponseCiphertext;
  if (attTemplateID === targetTemplateID) {
    let extendedData = JSON.parse(
      primusZKTLS.getExtendedData(request.requestid)
    );
    console.log("extendedData=", extendedData);
    completeHttpResponseCiphertext = JSON.parse(
      extendedData.CompleteHttpResponseCiphertext
    );
    console.log(
      "completeHttpResponseCiphertext=",
      completeHttpResponseCiphertext
    );
  }
  return { attestation, completeHttpResponseCiphertext };

  //verify siganture TODO
  // const verifyResult = await primusZKTLS.verifyAttestation(attestation);
  // console.log("verifyResult=", verifyResult);

  //   if (verifyResult === true && attTemplateID === targetTemplateID) {
  //     const zkVmRequestData = {
  //       attestationData: {
  //         public_data: attestation,
  //         private_data: {
  //           aes_key: completeHttpResponseCiphertext.packets[0].aes_key,
  //         },
  //       },
  //       requestid: request.requestid,
  //     };
  //     console.log("zkVmRequestData=", zkVmRequestData);

  //     //   const zkVMServerUrl = "http://35.198.243.131:38080/";
  //     try {
  //       const sendZkVmRes = await postJson("/zktls/prove", zkVmRequestData);
  //       console.log("sendZkVmRes=", sendZkVmRes);
  //       if (sendZkVmRes.code !== "0") {
  //         return;
  //       }
  //     } catch (error) {
  //       console.log("send request error.");
  //     }

  //     const timer = setInterval(async () => {
  //       try {
  //         const getZkVmRes = await postJson("/zktls/result", {
  //           requestid: request.requestid,
  //         });
  //         console.log("getZkVmRes=", getZkVmRes);
  //         if (
  //           getZkVmRes.code === "0" &&
  //           (getZkVmRes.details.status === "done" ||
  //             getZkVmRes.details.status === "error")
  //         ) {
  //           clearInterval(timer);
  //           if (getZkVmRes.details.status === "done") {
  //             const pv_file = getZkVmRes.details.pv_file;
  //             console.log("pv_file=", pv_file);
  //           }
  //         }
  //       } catch (error) {
  //         console.log("query result error.");
  //       }
  //     }, 5000);
  //   } else {
  //   }
}

async function postJson(url, data, headers = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log("response=", response);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("POST request failed:", err);
    throw err;
  }
}
