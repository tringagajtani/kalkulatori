import { useState } from "react";

const API_URL = "/api/calculate";

const OPERATIONS = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalculate(operationSymbol) {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          num1: parseFloat(num1),
          num2: parseFloat(num2),
          operation: OPERATIONS[operationSymbol],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="calculator">
      <div className="inputs">
        <input
          type="number"
          placeholder="First number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          placeholder="Second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <div className="buttons">
        {Object.keys(OPERATIONS).map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleCalculate(symbol)}
            disabled={loading}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div className="display">
        {loading && <p className="loading">Calculating...</p>}
        {error && <p className="error">{error}</p>}
        {result !== null && !error && (
          <p className="result">Result: {result}</p>
        )}
      </div>
    </div>
  );
}

export default Calculator;
