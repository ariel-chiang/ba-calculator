import React, { useState } from "react";
import Keypad from "./Keypad";

export default function Calculator() {
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState("");
  const [operator, setOperator] = useState("");

  return (
    <div className="calculator">
      <div className="result">
        <div className="history">{history + operator}</div>
        {result}
      </div>
      <Keypad
        history={history}
        setHistory={setHistory}
        result={result}
        setResult={setResult}
        operator={operator}
        setOperator={setOperator}
      />
    </div>
  );
}
