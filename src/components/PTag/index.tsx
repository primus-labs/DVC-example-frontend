import React, { memo } from "react";
import "./index.scss";

interface PTagProps {
  text?: any;
}

const PTag: React.FC<PTagProps> = memo(({ text }) => {
  return <div className={`pTag`}>{text}</div>;
});

export default PTag;
