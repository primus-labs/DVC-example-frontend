import { useState, useCallback } from "react";
import { primusProofTest } from "./testprimus";
import { targetTemplateID } from "./config/constants";
import PTag from "./components/PTag";
import OperationBar from "./components/Home/OperationBar";
import VerifyResCard from "./components/Home/VerifyResCard";
import PAlert from "./components/PAlert";
import icocOperation from "@images/home/operation.svg";
import "./App.scss";

function App() {
  const [attestation, setAttestation] = useState(undefined);
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
      const att = await primusProofTest(targetTemplateID);
      setAttestation(att);
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
  const onClickStart = useCallback(() => {}, []);
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
              subTitle="Compute the total trade amount, and verify whether it exceeds 1000 USD using zkVM."
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
