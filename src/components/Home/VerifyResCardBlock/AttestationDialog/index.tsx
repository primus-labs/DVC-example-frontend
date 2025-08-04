import React, { memo } from "react";
import "./index.scss";
import PMask from "@components/PMask";
import PJson from "@components/PJson";
import PClose from "@components/PClose";


interface AttestationDialogProps {
  attestation: any;
  onClose: () => void;
}

const AttestationDialog: React.FC<AttestationDialogProps> = memo(
  ({ attestation, onClose }) => {
    return (
      <PMask>
        <div className={`attestationDialog`}>
          <PClose onClick={onClose} />
          <div className="title">Verified Details</div>
          <PJson data={attestation} />
        </div>
      </PMask>
    );
  }
);

export default AttestationDialog;
