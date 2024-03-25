import { useState, useEffect } from "react";
import useTVM from "../hooks/useTVM";

export default function Keypad({
  history,
  setHistory,
  result,
  setResult,
  operator,
  setOperator,
  setTVMinfo,
}) {
  const keys = [
    { key: "CPT", symbol: "CPT" },
    { key: "P/Y", symbol: "P/Y" },
    { key: "C/Y", symbol: "C/Y" },
    { key: "CLR_TVM", symbol: "CLR TVM" },
    { key: "->", symbol: "→" },
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

  const {
    numPeriod,
    interestRate,
    presentValue,
    payment,
    futureValue,
    paymentYear,
    compoundYear,
    setN,
    setIY,
    setPV,
    setPMT,
    setFV,
    setPY,
    setCY,
    computeN,
    computeIY,
    computePV,
    computePMT,
    computeFV,
    clearTVM,
  } = useTVM();

  const operators = ["=", "+", "-", "*", "/", "**"];
  const immediate_ops = ["**(-1)", "*0.01", "e^x", "LN", "*(-1)"];
  const tvm_ops = ["N", "I/Y", "PV", "PMT", "FV", "P/Y", "C/Y"];

  const [tempResult, setTempResult] = useState("0");
  const [computeMode, setComputeMode] = useState(false);

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
    } else if (k.key === "CLR_TVM") {
      setN(1);
      setIY(1);
      setPV(0);
      setPMT(0);
      setFV(0);
      setPY(1);
      setCY(1);
    } else if (k.key === "CPT") {
      setComputeMode(true);
    } else if (tvm_ops.includes(k.key)) {
      if (k.key === "N") {
        setN(result);
      } else if (k.key === "I/Y") {
        setIY(result);
      } else if (k.key === "PV") {
        setPV(result);
      } else if (k.key === "PMT") {
        setPMT(result);
      } else if (k.key === "FV") {
        if (computeMode) {
          setComputeMode(false);
          setResult(computeFV());
        } else {
          setFV(result.toFixed(4));
        }
      } else if (k.key === "P/Y") {
        setPY(result);
      } else if (k.key === "C/Y") {
        setCY(result);
      }
      setHistory(k.key);
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
        if (tvm_ops.includes(history) === false) {
          // eslint-disable-next-line no-eval
          setResult(eval(history).toFixed(4));
        }
      } catch (e) {
        setResult("ERROR");
      }
    } else {
      setResult(tempResult);
    }
  }, [tempResult, history, setResult, tvm_ops]);

  useEffect(() => {
    setTVMinfo(
      "Number of periods (N): " +
        numPeriod +
        ", Interest rate per year (I/Y): " +
        interestRate +
        ", Present value (PV): " +
        presentValue +
        ", Payment (PMT): " +
        payment +
        ", Future value (FV): " +
        futureValue +
        ", Number of payments per year (P/Y): " +
        paymentYear +
        ", Number of compounding periods per year (C/Y): " +
        compoundYear
    );
  }, [
    numPeriod,
    interestRate,
    presentValue,
    payment,
    futureValue,
    setTVMinfo,
    paymentYear,
    compoundYear,
  ]);

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
