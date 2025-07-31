import React, { memo } from "react";
import "./index.scss";

interface PMaskProps {
  children?: any;
  className?: string;
}

const PMask: React.FC<PMaskProps> = memo(({ children, className }) => {
  return <div className={`pMask ${className}`}>{children}</div>;
});

export default PMask;
