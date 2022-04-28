"use strict";

//Date on the footer
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

//////////
const lineTop = document.querySelector(".calculator__monitor-line-1");
const lineBottom = document.querySelector(".calculator__monitor-line-2");
const btnNum = document.querySelectorAll(".btn-num");
const btns = document.querySelectorAll("button");
const keys = document.querySelector(".calculator__body");
const btnOperators = document.querySelectorAll(".btn-operations");
const btnClear = document.querySelector(".btn-clear");
const btnBackspace = document.querySelector(".btn-backspace");
const btnEqual = document.querySelector(".btn-equal");

const calculator = {
  displayValue: "0",
  storedValue: "",
  firstNum: null,
  secondNum: null,
  waitingForSecondNum: false,
  operator: null,
};

function init() {
  lineBottom.textContent = 0;
  lineTop.innerHTML = "&nbsp;";
  calculator.displayValue = "0";
  calculator.firstNum = null;
  calculator.secondNum = null;
  calculator.waitingForSecondNum = false;
  calculator.operator = null;
}

init();

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operation, x, y) {
  switch (operation) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      if (y === 0) return "error";
      else return divide(x, y);
    default:
      return null;
  }
}

function updateDisplay() {
  if (String(calculator.displayValue).length > 9) {
    lineBottom.style.fontSize = "4rem";
    lineBottom.textContent = "MAX DIGITS REACHED";
  } else if (
    String(calculator.displayValue).length >= 7 &&
    calculator.displayValue < 1
  )
    lineBottom.textContent = Number(calculator.displayValue).toFixed(7);
  else lineBottom.textContent = calculator.displayValue;
}

function inputDigits(num) {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue === "0" ? num : displayValue + num;
}

function displayKeyValues(e) {
  const { target } = e;

  if (target.classList.contains("btn-num")) {
    inputDigits(target.value);
  }

  if (target.classList.contains("btn-operations")) {
    inputDigits(target.value);
    calculator.firstNum = calculator.displayValue;
    calculator.displayValue = "0";
    lineTop.textContent = calculator.firstNum;
    calculator.waitingForSecondNum = true;

    if (calculator.waitingForSecondNum) {
      calculator.operator = calculator.firstNum.slice(-1);
    }
  }
  if (calculator.waitingForSecondNum && target.value === "=") {
    console.log(calculator);
    calculator.secondNum = calculator.displayValue;
    lineTop.textContent = calculator.firstNum + calculator.secondNum;
    calculator.waitingForSecondNum = false;
    let x = parseFloat(calculator.firstNum);
    let y = parseFloat(calculator.secondNum);
    calculator.displayValue = operate(calculator.operator, x, y);
    console.log(String(calculator.displayValue).length);
  }
  if (target.classList.contains("btn-decimal")) {
    if (calculator.displayValue.includes(".")) return;
    inputDigits(target.value);
  }
  updateDisplay();
}

//Event listeners
btnClear.addEventListener("click", init);

btnBackspace.addEventListener("click", function (e) {
  calculator.displayValue = calculator.displayValue.slice(0, -1);
  updateDisplay();
});

keys.addEventListener("click", displayKeyValues);
