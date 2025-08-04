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

}

