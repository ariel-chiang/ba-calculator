import { useState, useEffect } from "react";

export default function Keypad({
  history,
  setHistory,
  result,
  setResult,
  operator,
  setOperator,
}) {
  const keys = [
    { key: "N", symbol: "N" },
    { key: "I/Y", symbol: "I/Y" },
    { key: "PV", symbol: "PV" },
    { key: "PMT", symbol: "PMT" },
    { key: "FV", symbol: "FV" },
    { key: "**(-1)", symbol: "1/x" },
    { key: "(", symbol: "(" },
    { key: ")", symbol: ")" },
    { key: "**", symbol: "y^x" },
    { key: "/", symbol: "/" },
    { key: "*0.01", symbol: "%" },
    { key: "7", symbol: "7" },
    { key: "8", symbol: "8" },
    { key: "9", symbol: "9" },
    { key: "*", symbol: "×" },
    { key: "e^x", symbol: "e^x" },
    { key: "4", symbol: "4" },
    { key: "5", symbol: "5" },
    { key: "6", symbol: "6" },
    { key: "-", symbol: "-" },
    { key: "LN", symbol: "LN" },
    { key: "1", symbol: "1" },
    { key: "2", symbol: "2" },
    { key: "3", symbol: "3" },
    { key: "+", symbol: "+" },
    { key: "CE|C", symbol: "CE|C" },
    { key: "0", symbol: "0" },
    { key: ".", symbol: "." },
    { key: "*(-1)", symbol: "+|-" },
    { key: "=", symbol: "=" },
  ];

  const operators = ["=", "+", "-", "*", "/", "**"];
  const immediate_ops = ["**(-1)", "*0.01", "e^x", "LN", "*(-1)"];

  const [tempResult, setTempResult] = useState("0");

  const handleKey = (k) => {
    if (operator === "=") {
      setHistory(result);
    }
    if (k.key === "CE|C") {
      setHistory("");
      setTempResult("0");
      setOperator("");
    } else if (operators.includes(k.key)) {
      if (operator === "") {
        if ((k.key === "*") | (k.key === "/") | (k.key === "**")) {
          setHistory("(" + history + tempResult + ")");
        } else {
          setHistory(history + tempResult);
        }
      }
      setOperator(k.key);
      setTempResult("");
    } else if (immediate_ops.includes(k.key)) {
      if ((k.key === "**(-1)") | (k.key === "*0.01") | (k.key === "*(-1)")) {
        setHistory("(" + history + tempResult + ")" + k.key);
      } else if (k.key === "e^x") {
        setHistory("Math.exp(" + history + tempResult + ")");
      } else if (k.key === "LN") {
        setHistory("Math.log(" + history + tempResult + ")");
      }
      setTempResult("");
      setOperator("=");
    } else {
      if (operator !== "") {
        if (operator === "=") {
          setHistory("");
        } else {
          setHistory(history + operator);
        }
        setOperator("");
      }
      if (((tempResult === "") | (tempResult === "0")) & (k.key !== ".")) {
        setTempResult(k.key);
      } else {
        setTempResult(tempResult + k.key);
      }
    }
  };

  useEffect(() => {
    if (tempResult === "") {
      try {
        setResult(eval(history).toFixed(4));
      } catch (e) {
        setResult("ERROR");
      }
    } else {
      setResult(tempResult);
    }
  }, [tempResult, history]);

  return (
    <div className="keypad">
      {keys.map((k, i) => (
        <button key={k.symbol} onClick={() => handleKey(k)}>
          {k.symbol}
        </button>
      ))}
    </div>
  );
}
