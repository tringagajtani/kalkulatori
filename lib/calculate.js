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
      return {
        error: "Invalid operation. Use: add, subtract, multiply, divide",
      };
  }
}

module.exports = { calculate };
