import React, { memo, useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import VerifyResCard from "../VerifyResCardBlock/VerifyResCard";
import iconBrevis from "@images/home/brevis.png";
import "./index.scss";
import AttestationDialog from "./AttestationDialog";
dayjs.extend(utc);

interface VerifyResCardProps {
  result?: any;
}

const VerifyResCardBlock: React.FC<VerifyResCardProps> = memo(({ result }) => {
  const [metaJson, setMetaJson] = useState<any>();
  const [resDialogVisible, setResDialogVisible] = useState(false);
  const onShowVerifyResDialog = () => {
    if (!metaJson) {
      fetchJsonFn();
    }
    setResDialogVisible((f) => !f);
  };
  const onCloseVerifyResDialog = () => {
    setResDialogVisible(false);
  };
  const fetchJsonFn = useCallback(() => {
    fetch(
      `https://pico-proofs.s3.us-west-2.amazonaws.com/task-${result}/metadata.json`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((resultContent) => {
        return resultContent.json();
      })
      .then((data) => {
        console.log("metadata.json =", data);
        setMetaJson(data);
      });
  }, [result]);

  useEffect(() => {
    fetchJsonFn()
  }, []);

  return (
    <>
      <VerifyResCard
        onClick={onShowVerifyResDialog}
        title="Computation Result"
        timestamp={+new Date()}
        icon={iconBrevis}
      />
      {resDialogVisible && (
        <AttestationDialog
          attestation={metaJson}
          aesKey={result}
          onClose={onCloseVerifyResDialog}
        />
      )}
    </>
  );
});

export default VerifyResCardBlock;
