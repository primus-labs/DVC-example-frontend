import React, { memo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AttestationDialog from "../VerifyResCardBlock/AttestationDialog";
import VerifyResCard from "../VerifyResCardBlock/VerifyResCard";
import "./index.scss";
dayjs.extend(utc);

interface VerifyResCardProps {
  attestation?: any;
}

const VerifyResCardBlock: React.FC<VerifyResCardProps> = memo(
  ({ attestation }) => {
    const [resDialogVisible, setResDialogVisible] = useState(false);
    const onShowVerifyResDialog = () => {
      setResDialogVisible((f) => !f);
    };
    const onCloseVerifyResDialog = () => {
      setResDialogVisible(false);
    };
    return (
      <>
        <VerifyResCard
          onClick={onShowVerifyResDialog}
          title="Computation Result"
          timestamp={+new Date()}
        />
        {resDialogVisible && (
          <AttestationDialog
            attestation={attestation}
            onClose={onCloseVerifyResDialog}
          />
        )}
      </>
    );
  }
);

export default VerifyResCardBlock;
