import React, { memo } from "react";
import PButton from "../PButton";
import "./index.scss";
interface PBackProps {
  onClick: () => void;
}
const PClose: React.FC<PBackProps> = memo(({ onClick }) => {
  return (
    <div className="pClose">
      <PButton
        className="closeBtn"
        type="icon"
        icon={<i className="iconfont icon-close"></i>}
        onClick={onClick}
      />
    </div>
  );
});

export default PClose;
