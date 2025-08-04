import React, { memo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AttestationDialog from "./AttestationDialog";
import VerifyResCard from "./VerifyResCard";
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
          title="Spot 30-day BNB Trade History"
          timestamp={attestation.timestamp}
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
