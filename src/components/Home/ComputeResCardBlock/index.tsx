import React, { memo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AttestationDialog from "../VerifyResCardBlock/AttestationDialog";
import VerifyResCard from "../VerifyResCardBlock/VerifyResCard";
import iconBrevis from "@images/home/brevis.png";
import "./index.scss";
dayjs.extend(utc);

interface VerifyResCardProps {
  result?: any;
}

const VerifyResCardBlock: React.FC<VerifyResCardProps> = memo(({ result }) => {
  const onShowVerifyResDialog = () => {
    window.open(result);
  };
  return (
    <>
      <VerifyResCard
        onClick={onShowVerifyResDialog}
        title="Computation Result"
        timestamp={+new Date()}
        icon={iconBrevis}
      />
    </>
  );
});

export default VerifyResCardBlock;
