import React, { useMemo, memo } from "react";
import "./index.scss";
type Msg = {
  type: string;
  title: string;
  desc?: string;
  onClose?: () => {};
};
const PAlert: React.FC<Msg> = memo(
  ({ type = "suc", title = "", desc = "" }) => {
    const activeIconName = useMemo(() => {
      let cN = "";
      if (type === "suc") {
        cN = "icon-success";
      } else if (type === "error") {
        cN = "icon-iconError";
      }
      return cN;
    }, [type]);

    return (
      <div className={`pAlert ${type} ${desc ? "" : "short"}`}>
        <div className="alertWrapper">
          <div className="iconWrapper">
            <i className={`iconfont ${activeIconName} resultIcon`}></i>
          </div>
          <div className="txtWrapper">
            {title && (
              <h1 className={`pAlertTit ${!desc && "middleTit"}`}>{title}</h1>
            )}
            {desc && <h2 className="pAlertDesc">{desc}</h2>}
          </div>
        </div>
      </div>
    );
  }
);

export default PAlert;
