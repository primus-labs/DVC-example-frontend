import React, { memo, useCallback, useState } from "react";
import { decodeCryptoAttestation } from "@/testprimus";
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
    const [rawResponse, setRawResponse] = useState(undefined);
    const onReveal = useCallback(async () => {
      const res = await decodeCryptoAttestation(attestation, aesKey);
      setRawResponse(res);
    }, []);
    return (
      <PMask>
        <div className={`attestationDialog`}>
          <PClose onClick={onClose} />
          <div className="title">Verified Details</div>
          <PJson data={rawResponse ? rawResponse : attestation} />
          <PButton
            onClick={onReveal}
            text="Reveal Content"
            className="revealBtn"
            disabled={!!rawResponse}
          />
        </div>
      </PMask>
    );
  }
);

export default AttestationDialog;
