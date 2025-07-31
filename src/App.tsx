import { useState } from "react";
import { primusProofTest } from "./testprimus";
import { targetTemplateID } from "./config/constants";
import "./App.css";

function App() {
  const onClickTry = async () => {
    await primusProofTest(targetTemplateID);
  };
  return (
    <>
      <button onClick={onClickTry}>Try</button>
    </>
  );
}

export default App;
