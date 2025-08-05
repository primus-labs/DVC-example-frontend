import React, { memo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AttestationDialog from "./AttestationDialog";
import VerifyResCard from "./VerifyResCard";
import iconBinance from "@images/home/binance.svg";
import "./index.scss";
dayjs.extend(utc);

interface VerifyResCardProps {
  attestation: any;
  aesKey: any;
}

const VerifyResCardBlock: React.FC<VerifyResCardProps> = memo(
  ({ attestation, aesKey }) => {
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
          icon={iconBinance}
        />
        {resDialogVisible && (
          <AttestationDialog
            attestation={attestation}
            aesKey={aesKey}
            onClose={onCloseVerifyResDialog}
          />
        )}
      </>
    );
  }
);

export default VerifyResCardBlock;
