import { useState, useCallback } from "react";
import { primusProofTest } from "./testprimus";
import { targetTemplateID } from "./config/constants";
import { callProveTask } from "./api/proving";
import PTag from "./components/PTag";
import OperationBar from "./components/Home/OperationBar";
import VerifyResCard from "./components/Home/VerifyResCard";
import PAlert from "./components/PAlert";
import icocOperation from "@images/home/operation.svg";
import "./App.scss";

function App() {
  const [attestation, setAttestation] = useState(undefined);
  const [completeHttpResponseCiphertext, setCompleteHttpResponseCiphertext] =
    useState(undefined);
  const [attestationMsg, setAttestationMsg] = useState<any>();
  // {
  //   type: "error",
  //   title: "Not verified",
  //   desc: "3",
  // }
  const setAttestationMsgFn = (obj: any) => {
    setAttestationMsg(obj);
    setTimeout(() => {
      setAttestationMsg(undefined);
    }, 5000);
  };
  const onClickVerify = useCallback(async () => {
    try {
      const res = await primusProofTest(targetTemplateID);
      setAttestation(res.attestation);
      debugger
      setCompleteHttpResponseCiphertext(res.completeHttpResponseCiphertext);
      setAttestationMsgFn({
        type: "suc",
        title: "Data verified",
      });
    } catch (e: any) {
      setAttestationMsgFn({
        type: "error",
        title: "Not verified",
        desc: `Error: ${e.code}. ${e.message}`,
      });
    }
  }, []);
  const onClickStart = useCallback(async () => {
    try {
      const params = {
        public_data: attestation,
        private_data: {
          aes_key: completeHttpResponseCiphertext?.packets[0].aes_key,
        },
      };
      const taskId = await callProveTask([JSON.stringify(params)]);
      console.log("Task ID:", taskId);
    } catch (err) {
      debugger;
      console.error("Error:", err);
    }
  }, [attestation, completeHttpResponseCiphertext]);
  return (
    <div className="app">
      <div className="appContent">
        <header className="appContentHeader">
          <PTag text="Demo" />
          <h1>Trade History Attestation</h1>
        </header>
        <section className="operationBlock">
          <h3>Work Flow</h3>
          <div className="operationList">
            <OperationBar
              icon={icocOperation}
              title="Verify 30-Day BNB Spot Trade History"
              subTitle="Verify the user’s BNB trade history list from spot account."
              operateText="Verify"
              onOperate={onClickVerify}
            />
            <OperationBar
              icon={icocOperation}
              title="Privacy-preserving Computation"
              subTitle="Compute the total trade amount, and verify whether it exceeds 100 USD using zkVM."
              operateText="Start"
              onOperate={onClickStart}
            />
          </div>
        </section>
        {attestation && (
          <section className="resultBlock">
            <h3>Verified Result</h3>
            <div className="resultList">
              <VerifyResCard attestation={attestation} />
            </div>
          </section>
        )}
        {attestationMsg?.title && <PAlert {...attestationMsg} />}
      </div>
    </div>
  );
}

export default App;
