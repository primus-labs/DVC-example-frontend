import React, { memo } from "react";
import "./index.scss";

const PLoading: React.FC = memo(() => {
  return (
    <div className="pLoading spinnerWrapper">
      <div className="loading-spinner"></div>
    </div>
  );
});

export default PLoading;
