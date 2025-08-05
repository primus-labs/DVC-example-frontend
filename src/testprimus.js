import { PrimusZKTLS } from "@primuslabs/zktls-js-sdk";
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";
globalThis.Buffer = Buffer;
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
      binanceRows: 10,
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

function incrNonce(nonceBuffer) {
  for (let i = 3; i >= 0; i--) {
    if (nonceBuffer[i] === 255) {
      nonceBuffer[i] = 0;
    } else {
      nonceBuffer[i]++;
      break;
    }
  }
}
class Aes128Encryptor {
  constructor(keyBytes) {
    if (keyBytes.length !== 16) {
      throw new Error("AES-128 key must be 16 bytes.");
    }
    this.keyBytes = keyBytes;
  }

  static fromHex(hexKey) {
    const keyBytes = Buffer.from(hexKey, "hex");
    return new Aes128Encryptor(keyBytes);
  }

  encryptBlock(inputBytes) {
    if (inputBytes.length !== 16) {
      throw new Error("ECB block encrypt requires 16 bytes input.");
    }
    const key = CryptoJS.lib.WordArray.create(this.keyBytes);
    const input = CryptoJS.lib.WordArray.create(inputBytes);
    const encrypted = CryptoJS.AES.encrypt(input, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding,
    });

    const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return Uint8Array.from(Buffer.from(encryptedHex, "hex"));
  }

  // encryptBlock(inputBytes) {
  //   if (inputBytes.length !== 16) {
  //     throw new Error('ECB block encrypt requires 16 bytes input.');
  //   }

  //   const cipher = crypto.createCipheriv('aes-128-ecb', this.keyBytes, null);
  //   cipher.setAutoPadding(false);

  //   const encrypted = Buffer.concat([
  //     cipher.update(Buffer.from(inputBytes)),
  //     cipher.final()
  //   ]);

  //   return Uint8Array.from(encrypted);
  // }

  computeContinuousCounters(nonceBytes, totalLength) {
    const result = [];
    const nonceIndex = Buffer.alloc(4, 0);

    incrNonce(nonceIndex);

    while (result.length < totalLength) {
      incrNonce(nonceIndex);

      const fullNonce = Buffer.concat([Buffer.from(nonceBytes), nonceIndex]);

      const encryptedCounter = this.encryptBlock(fullNonce);

      result.push(...encryptedCounter);
    }

    return Uint8Array.from(result.slice(0, totalLength));
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

function bytesToUtf8(bytes) {
  return new TextDecoder().decode(new Uint8Array(bytes));
}
class TLSRecord {
  constructor(ciphertext, nonce, jsonBlockPositions) {
    this.ciphertext = ciphertext; // TLS record ciphertext (hex string)
    this.nonce = nonce; // TLS record nonce (hex string)
    this.jsonBlockPositions = jsonBlockPositions; // Array of [start, end] pairs
  }
}
class HTTPPacket {
  constructor(records) {
    this.records = records; // Array of TLSRecord
  }
}

class TLSData {
  constructor(packets) {
    this.packets = packets; // Array of HTTPPacket
  }

  async getFullPlainResponse(aesKeyHex) {
    const completeResponses = [];
    const cipher = await Aes128Encryptor.fromHex(aesKeyHex);

    for (const packet of this.packets) {
      let completeResponse = "";

      for (const record of packet.records) {
        const nonce = hexToBytes(record.nonce);
        const ciphertext = hexToBytes(record.ciphertext);
        const ciphertextLen = ciphertext.length;

        const counters = await cipher.computeContinuousCounters(
          nonce,
          ciphertextLen
        );
        const plaintextBytes = counters.map(
          (counterByte, idx) => counterByte ^ ciphertext[idx]
        );
        const plaintext = bytesToUtf8(plaintextBytes);

        completeResponse += plaintext;
      }

      completeResponses.push(completeResponse);
    }

    return completeResponses;
  }
}

export const decodeCryptoAttestation = async (attestation, aesKey) => {
  const data = JSON.parse(attestation.data);
  const parsed = JSON.parse(data.CompleteHttpResponseCiphertext);
  const tlsData = new TLSData(
    parsed.packets.map(
      (packet) =>
        new HTTPPacket(
          packet.records.map(
            (record) =>
              new TLSRecord(
                record.ciphertext,
                record.nonce,
                record.json_block_positions
              )
          )
        )
    )
  );
  const fullPlainResponse = await tlsData.getFullPlainResponse(aesKey);
  console.log("fullPlainResponse=", fullPlainResponse);
  debugger;
  const bodyStart = fullPlainResponse[0].indexOf("\r\n\r\n") + 4;
  const jsonStr = fullPlainResponse[0].substring(bodyStart);

  const result = JSON.parse(jsonStr);
  return result;
};
