import React, { memo, useCallback } from "react";
import "./index.scss";
import PMask from "@components/PMask";
import PJson from "@components/PJson";
import PClose from "@components/PClose";
import PButton from "@components/PButton";

interface AttestationDialogProps {
  attestation: any;
  aesKey: any;
  onClose: () => void;
}

const AttestationDialog: React.FC<AttestationDialogProps> = memo(
  ({ attestation, aesKey, onClose }) => {
    const onReveal = useCallback(async () => {
      window.open(`https://pico-proofs.s3.us-west-2.amazonaws.com/task-${aesKey}/proof.bin`);
    }, []);
    return (
      <PMask>
        <div className={`compute attestationDialog`}>
          <PClose onClick={onClose} />
          <div className="title">Computation Result</div>
          <PJson data={attestation} />
          <PButton
            onClick={onReveal}
            text="Download File"
            className="revealBtn"
          />
        </div>
      </PMask>
    );
  }
);

export default AttestationDialog;
