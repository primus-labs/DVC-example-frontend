import React, { memo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import iconClock from "@images/home/clock.svg";
// import iconRecords from "@images/home/records.svg";
import "./index.scss";
dayjs.extend(utc);

interface VerifyResCardProps {
  onClick?: () => void;
  title: string;
  timestamp: number;
  icon: any;
}

const VerifyResCard: React.FC<VerifyResCardProps> = memo(
  ({ onClick, title, timestamp, icon }) => {
    return (
      <div className={`verifyResCard`} onClick={onClick}>
        <img src={icon} alt="" />
        <div className="verifyResIntro">
          <div className="title">{title}</div>
          <div className="descItems">
            <div className="descItem time">
              <img src={iconClock} alt="" />
              <span>{dayjs.utc(timestamp).format("YYYY.M.D")}</span>
            </div>
            {/* <div className="descItem records">
              <img src={iconRecords} alt="" />
              <span></span>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
);

export default VerifyResCard;
