const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

function calculate(num1, num2, operation) {
  const a = Number(num1);
  const b = Number(num2);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return { error: "Invalid numbers provided" };
  }

  switch (operation) {
    case "add":
      return { result: a + b };
    case "subtract":
      return { result: a - b };
    case "multiply":
      return { result: a * b };
    case "divide":
      if (b === 0) {
        return { error: "Cannot divide by zero" };
      }
      return { result: a / b };
    default:
      return { error: "Invalid operation. Use: add, subtract, multiply, divide" };
  }
}

app.post("/api/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

  if (num1 === undefined || num2 === undefined || !operation) {
    return res.status(400).json({
      error: "Missing required fields: num1, num2, operation",
    });
  }

  const outcome = calculate(num1, num2, operation);

  if (outcome.error) {
    const status = outcome.error === "Cannot divide by zero" ? 400 : 400;
    return res.status(status).json({ error: outcome.error });
  }

  res.json({ result: outcome.result });
});

app.listen(PORT, () => {
  console.log(`Calculator API running on http://localhost:${PORT}`);
});
