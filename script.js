"use strict";

//Date on the footer
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

//////////
const lineTop = document.querySelector(".calculator__monitor-line-1");
const lineBottom = document.querySelector(".calculator__monitor-line-2");

const calculator = {
  displayValue: "0",
  storedValue: "",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.storedValue = "";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  lineBottom.style.fontSize = "6rem";
  console.log(calculator);
}

function deleteCalculator() {
  calculator.displayValue = calculator.displayValue.slice(0, -1);
}

function updateDisplay() {
  if (
    String(calculator.displayValue).length >= 7 &&
    calculator.displayValue < 1
  )
    lineBottom.textContent = Number(calculator.displayValue).toFixed(7);
  else if (String(calculator.displayValue).length > 9) {
    lineBottom.style.fontSize = "4rem";
    lineBottom.textContent = "MAX DIGITS REACHED";
  } else {
    lineBottom.textContent = calculator.displayValue;
    lineTop.textContent = calculator.storedValue;
  }
}

updateDisplay();

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function inputOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    calculator.storedValue = calculator.storedValue.slice(0, -1);
    calculator.storedValue += nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.storedValue += calculator.displayValue + nextOperator;
    calculator.firstOperand = inputValue;
  } else if (operator) {
    calculator.storedValue += calculator.displayValue + nextOperator;
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

////Event listeners
const keys = document.querySelector(".calculator__body");

keys.addEventListener("click", (event) => {
  // Access the clicked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("btn-operations")) {
    inputOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("btn-decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("btn-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains("btn-backspace")) {
    deleteCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

window.addEventListener("keydown", function (e) {
  console.log(e);

  let { key } = e;
  const operations = ["+", "-", "*", "/", "=", "Enter"];
  const numbers = "0123456789";

  if (numbers.includes(key)) {
    inputDigit(key);
    updateDisplay();
    return;
  }

  if (operations.includes(key)) {
    if (key === "Enter") {
      key = "=";
      inputOperator(key);
      updateDisplay();
    } else {
      inputOperator(key);
      updateDisplay();
    }
    return;
  }

  if (key === ".") {
    inputDecimal(key);
    updateDisplay();
    return;
  }

  if (key === "Delete") {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (key === "Backspace") {
    deleteCalculator();
    updateDisplay();
    return;
  }
});
