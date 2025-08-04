import React, { memo } from "react";
import PLoading from "@/components/PLoading";
import iconDone from "@/assets/images/home/done.svg";
import "./index.scss";

interface OperationBarProps {
  icon: any;
  title: string;
  subTitle: string;
  done: boolean;
  loading: boolean;
}

const OperationBar: React.FC<OperationBarProps> = memo(
  ({ icon, title, subTitle, done, loading }) => {
    return (
      <div className={`operationBar`}>
        <div className="operationIntro">
          <img src={icon} alt="" />
          <div className="operationTxtWrapper">
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
          </div>
        </div>
        {done ? (
          <img src={iconDone} alt="" />
        ) : loading ? (
          <PLoading />
        ) : (
          <></>
        )}
        {/* <PButton onClick={onOperate} text={operateText} className="operationBtn" /> */}
      </div>
    );
  }
);

export default OperationBar;
