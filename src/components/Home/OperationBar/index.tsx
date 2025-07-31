import React, { memo } from "react";
import "./index.scss";
import PButton from "@components/PButton";

interface OperationBarProps {
  icon: any;
  title: string;
  subTitle: string;
  operateText: string;
  onOperate: () => void;
}

const OperationBar: React.FC<OperationBarProps> = memo(
  ({ icon, title, subTitle, operateText, onOperate }) => {
    return (
      <div className={`operationBar`}>
        <div className="operationIntro">
          <img src={icon} alt="" />
          <div className="operationTxtWrapper">
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
          </div>
        </div>
        <PButton onClick={onOperate} text={operateText} className="operationBtn" />
      </div>
    );
  }
);

export default OperationBar;
