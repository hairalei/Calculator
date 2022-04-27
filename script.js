"use strict";

//Date on the footer
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

//////////
const lineTop = document.querySelector(".calculator__monitor-line-1");
const lineBottom = document.querySelector(".calculator__monitor-line-2");
const btnNum = document.querySelectorAll(".btn-num");
const btns = document.querySelectorAll("button");
const btnOperators = document.querySelectorAll(".btn-operations");
const btnClear = document.querySelector(".btn-clear");
const btnBackspace = document.querySelector(".btn-backspace");
const btnEqual = document.querySelector(".btn-equal");

const calculator = {
  displayValue: "0",
  firstNum: null,
  waitingForSecondNum: false,
  operator: null,
};

function init() {
  lineBottom.textContent = 0;
  lineTop.innerHTML = "&nbsp;";
  calculator.displayValue = "0";
  calculator.firstNum = null;
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
  x = Number(x);
  y = Number(y);
  switch (operation) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "÷":
      if (y === 0) return "error";
      else return divide(x, y);
    default:
      return null;
  }
}

function updateDisplay() {
  lineBottom.textContent = calculator.displayValue;
}

function inputDigits(num) {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue === "0" ? num : displayValue + num;
}

//Event listeners
btnClear.addEventListener("click", init);

btnBackspace.addEventListener("click", function (e) {
  calculator.displayValue = calculator.displayValue.slice(0, -1);
  updateDisplay();
});

btns.forEach(function (key) {
  key.addEventListener("click", function (e) {
    const { target } = e;

    if (target.classList.contains("btn-num")) {
      console.log("num", target.value);
      inputDigits(target.value);
      updateDisplay();
    } else if (target.classList.contains("btn-operations")) {
      console.log("operator", target.value);
    } else if (target.classList.contains("btn-decimal")) {
      console.log("decimal", target.value);
    }
  });
});
