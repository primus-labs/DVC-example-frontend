import React, { memo, useEffect, useState } from "react";
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
  const [metaJson, setMetaJson] = useState<any>()
  const [resDialogVisible, setResDialogVisible] = useState(false);
  const onShowVerifyResDialog = () => {
    setResDialogVisible((f) => !f);
  };
  const onCloseVerifyResDialog = () => {
    setResDialogVisible(false);
  };
  
  useEffect(() => {
    console.log("metajson result=", result);
    fetch(`https://pico-proofs.s3.us-west-2.amazonaws.com/task-${result}/metadata.json`, {
      method: 'GET',
      mode: 'cors'
    }).
    then((resultContent) => {
      console.log("resultContent=", resultContent.json());
      setMetaJson(resultContent.json());
    });
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
