import { useState } from "react";

const useTVM = () => {
  const [numPeriod, setNumPeriod] = useState(1);
  const [interestRate, setInterestRate] = useState(0);
  const [presentValue, setPresentValue] = useState(0);
  const [payment, setPayment] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [paymentYear, setPaymentYear] = useState(1);
  const [compoundYear, setCompoundYear] = useState(1);

  const setN = (value) => {
    if (value > 0) {
      setNumPeriod(value);
    }
  };
  const computeN = () => {};
  const setIY = (value) => {
    setInterestRate(value * 0.01);
  };
  const computeIY = () => {};
  const setPV = (value) => {
    setPresentValue(value);
  };
  const computePV = () => {};
  const setPMT = (value) => {
    setPayment(value);
  };
  const computePMT = () => {};
  const setFV = (value) => {
    setFutureValue(value);
  };
  const computeFV = () => {
    if (interestRate !== 0) {
      return -(
        presentValue * (1 + interestRate) ** numPeriod +
        (payment * ((1 + interestRate) ** numPeriod - 1)) / interestRate
      );
    } else {
      return -(presentValue + payment * numPeriod);
    }
  };
  const setPY = (value) => {
    if (value > 0) {
      setPaymentYear(value);
    }
  };
  const setCY = (value) => {
    if (value > 0) {
      setCompoundYear(value);
    }
  };
  const clearTVM = () => {
    setNumPeriod(1);
    setInterestRate(0);
    setPresentValue(0);
    setPMT(0);
    setFV(0);
  };

  return {
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
  };
};

export default useTVM;
