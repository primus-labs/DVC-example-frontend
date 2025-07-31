import React, { memo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AttestationDialog from "../AttestationDialog";
import iconBinance from "@images/home/binance.svg";
import iconClock from "@images/home/clock.svg";
import iconRecords from "@images/home/records.svg";
import "./index.scss";
dayjs.extend(utc);

interface VerifyResCardProps {
  attestation?: any;
}

const VerifyResCard: React.FC<VerifyResCardProps> = memo(({ attestation }) => {
  const [resDialogVisible, setResDialogVisible] = useState(false);
  const onShowVerifyResDialog = () => {
    setResDialogVisible((f) => !f);
  };
  const onCloseVerifyResDialog = () => {
    setResDialogVisible(false);
  };
  return (
    <>
      <div className={`verifyResCard`} onClick={onShowVerifyResDialog}>
        <img src={iconBinance} alt="" />
        <div className="verifyResIntro">
          <div className="title">Spot 30-day BNB Trade History</div>
          <div className="descItems">
            <div className="descItem time">
              <img src={iconClock} alt="" />
              <span>{dayjs.utc(attestation.timestamp).format("YYYY.M.D")}</span>
            </div>
            <div className="descItem records">
              <img src={iconRecords} alt="" />
              <span></span>
            </div>
          </div>
        </div>
      </div>
      {resDialogVisible && (
        <AttestationDialog
          attestation={attestation}
          onClose={onCloseVerifyResDialog}
        />
      )}
    </>
  );
});

export default VerifyResCard;
