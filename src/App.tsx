import { useState, useCallback, useMemo, useEffect } from "react";
import { primusProofTest } from "./testprimus.js";
import { targetTemplateID } from "./config/constants";
import { callProveTask } from "./api/proving";
import PTag from "./components/PTag";
import OperationBar from "./components/Home/OperationBar";
import VerifyResCardBlock from "./components/Home/VerifyResCardBlock";
import ComputeResCardBlock from "./components/Home/ComputeResCardBlock";
import PButton from "./components/PButton";
import PAlert from "./components/PAlert";
import icocOperation from "@images/home/operation.svg";
import "./App.scss";

function App() {
  const [attestation, setAttestation] = useState(undefined);
  const [completeHttpResponseCiphertext, setCompleteHttpResponseCiphertext] =
    useState(undefined);
  const [attestationMsg, setAttestationMsg] = useState<any>();
  const [attestLoading, setAttestLoading] = useState(false);
  const [computeLoading, setComputeLoading] = useState(false);
  const [taskId, setTaskId] = useState("");

  const isLoading = useMemo(() => {
    return attestLoading || computeLoading;
  }, [attestLoading, computeLoading]);
  const startBtnText = useMemo(() => {
    if (isLoading) {
      return "Verifing";
    } else {
      return "Start";
    }
  }, [isLoading]);
  const setAttestationMsgFn = (obj: any) => {
    setAttestationMsg(obj);
    setTimeout(() => {
      setAttestationMsg(undefined);
    }, 5000);
  };
  const onClickVerify = useCallback(async () => {
    try {
      setAttestLoading(true);
      setAttestation(undefined);
      setTaskId("");
      const res = await primusProofTest(targetTemplateID);
      setAttestation(res.attestation);
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
    } finally {
      setAttestLoading(false);
    }
  }, []);
  const onClickStart = useCallback(async () => {
    try {
      const params = {
        public_data: attestation,
        private_data: {
          aes_key: (completeHttpResponseCiphertext as any)?.packets[0].aes_key,
        },
      };
      console.log("callProveTask params", JSON.stringify(params));
      setComputeLoading(true);
      setTaskId("");
      const taskId = await callProveTask([JSON.stringify(params)]);
      setTimeout(() => {
        console.log("Task ID:", taskId);
        setTaskId(taskId);
        setAttestationMsgFn({
          type: "suc",
          title: "Computation completed",
        });
        setComputeLoading(false);
      }, 5000);
    } catch (err) {
      console.error("Error:", err);
      setAttestationMsgFn({
        type: "error",
        title: "Computation failed",
      });
      setComputeLoading(false);
    } finally {
    }
  }, [attestation, completeHttpResponseCiphertext]);
  const onStart = useCallback(async () => {
    await onClickVerify();
  }, [onClickVerify]);
  useEffect(() => {
    if (attestation && completeHttpResponseCiphertext) {
      onClickStart();
    }
  }, [attestation, completeHttpResponseCiphertext]);
  return (
    <div className="app">
      <div className="appContent">
        <header className="appContentHeader">
          <PTag text="Demo" />
          <h1>Trade History Attestation</h1>
          <p>
            Verify the user’s 30-day BNB spot trade history on Binance and check
            whether the trading volume exceeds 100 USD using zkVM.
          </p>
          <PButton
            onClick={onStart}
            text={startBtnText}
            className="startBtn"
            disabled={isLoading}
          />
        </header>
        <section className="operationBlock">
          <h3>Work Flow</h3>
          <div className="operationList">
            <OperationBar
              icon={icocOperation}
              title="Verify 30-Day BNB Spot Trade History"
              subTitle="Verify the user’s BNB trade history list from spot account."
              done={!!attestation}
              loading={attestLoading}
            />
            <OperationBar
              icon={icocOperation}
              title="Privacy-preserving Computation"
              subTitle="Compute the total trade volume, and verify whether it exceeds 100 USD using zkVM."
              done={!!taskId}
              loading={computeLoading}
            />
          </div>
        </section>
        {attestation && (
          <div className="resultList">
            <section className="resultBlock">
              <h3>Verified Result</h3>
              <div className="resultList">
                {attestation && (
                  <VerifyResCardBlock
                    attestation={attestation}
                    aesKey={
                      (completeHttpResponseCiphertext as any)?.packets[0]
                        .aes_key
                    }
                  />
                )}
                {taskId && (
                  <ComputeResCardBlock
                    result={`${taskId}`}
                  />
                )}
              </div>
            </section>
          </div>
        )}
        {attestationMsg?.title && <PAlert {...attestationMsg} />}
      </div>
    </div>
  );
}

export default App;
