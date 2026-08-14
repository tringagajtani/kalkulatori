const { calculate } = require("../lib/calculate");

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { num1, num2, operation } = req.body;

  if (num1 === undefined || num2 === undefined || !operation) {
    return res.status(400).json({
      error: "Missing required fields: num1, num2, operation",
    });
  }

  const outcome = calculate(num1, num2, operation);

  if (outcome.error) {
    return res.status(400).json({ error: outcome.error });
  }

  res.json({ result: outcome.result });
};
