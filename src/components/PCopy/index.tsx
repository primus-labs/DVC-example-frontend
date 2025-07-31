import React, { memo, useCallback, useState } from "react";
import { copy } from "@/utils/utils";
import PButton from "@components/PButton";
import "./index.scss";
interface PBackProps {
  text: string;
}
const PCopy: React.FC<PBackProps> = memo(({ text }) => {
  console.log("text", text);
  const [copied, setCopied] = useState(false);
  const onClick = useCallback(() => {
    copy(text);
    setCopied(true);
    let timer = setTimeout(() => {
      copy(text);
      setCopied(false);
      clearTimeout(timer);
    }, 2000);
  }, [text]);
  return (
    <div className="pCopy">
      <PButton
        className="copyBtn"
        type="icon"
        icon={
          <i className={`iconfont ${copied ? "icon-copied" : "icon-Copy"}`}></i>
        }
        onClick={onClick}
      />
    </div>
  );
});

export default PCopy;
