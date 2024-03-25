import Calculator from "./components/Calculator";
import { useState } from "react";

function App() {
  const [TVMinfo, setTVMinfo] = useState("");

  return (
    <div className="App" class="grid-container">
      <div class="grid-calculator">
        <h1>Business Analyst Calculator</h1>
        <Calculator TVMinfo={TVMinfo} setTVMinfo={setTVMinfo} />
      </div>
      <div class="tvm-settings">
        <h2>Time Value of Money (TVM) settings</h2>
        {TVMinfo.split(", ").map((value) => (
          <div class="tvm-item">{value}</div>
        ))}
      </div>
      <div class="tvm-settings">
        <h2>Try this example</h2>
        <p>
          Suppose you have a savings account paying 5% compounded at the end of
          each year.
        </p>
        <p>
          If you open an account with $10,000, how much will you have after 20
          years?
        </p>
        <p>Press the followings in order to solve:</p>
        <div class="tvm-instructions">
          20 → N → 5 → I/Y → 10000 → +|- → PV → 0 → PMT → CPT → FV
        </div>
        <p>Your answer would be $26,532.97 after 20 years.</p>
      </div>
    </div>
  );
}

export default App;
