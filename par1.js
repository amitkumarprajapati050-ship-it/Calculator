const display = document.getElementById("total");
const buttons = document.querySelectorAll(".contaner button");

let currentInput = "";
let previousInput = "";
let operator = "";

// NEW (for repeated =)
let lastOperator = "";
let lastNumber = "";

// =============== BUTTON CLICKS ===============
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.innerText);
  });
});

// =============== KEYBOARD INPUT ===============
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") handleInput(key);
  else if (["+", "-", "*", "/"].includes(key)) handleInput(key);
  else if (key === "Enter") handleInput("=");
  else if (key === "Backspace") handleInput("CE");
  else if (key === "Escape") handleInput("C");
});

// =============== MAIN LOGIC ===============
function handleInput(value) {
  // Numbers
  if (!isNaN(value) || value === ".") {
    currentInput += value;
    display.value = currentInput;
    return;
  }

  // Operators
  if (["+", "-", "*", "/"].includes(value)) {
    if (currentInput === "") return;
    operator = value;
    previousInput = currentInput;
    currentInput = "";
    return;
  }

  // Equal (=)
  if (value === "=") {
    // Repeat last operation
    if (currentInput === "" && lastOperator && lastNumber) {
      previousInput = display.value;
      operator = lastOperator;
      currentInput = lastNumber;
    }

    if (!previousInput || !currentInput) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Error";
        break;
    }

    // Save for repeat =
    lastOperator = operator;
    lastNumber = currentInput;

    display.value = result;
    currentInput = "";
    previousInput = result.toString();
    operator = "";
    return;
  }

  // Clear All
  if (value === "C") {
    currentInput = "";
    previousInput = "";
    operator = "";
    lastOperator = "";
    lastNumber = "";
    display.value = "";
    return;
  }

  // Clear Entry
  if (value === "CE") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    return;
  }

  // Plus / Minus
  if (value === "+/-") {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) * -1).toString();
      display.value = currentInput;
    }
  }
}
