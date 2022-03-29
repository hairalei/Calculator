"use strict";

//Date on the footer
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

//////////
const lineTop = document.querySelector(".calculator__monitor-line-1");
const lineBottom = document.querySelector(".calculator__monitor-line-2");
const btnNum = document.querySelectorAll(".btn-num");
const btnOperators = document.querySelectorAll(".btn-operations");
const btnClear = document.querySelector(".btn-clear");
const btnBackspace = document.querySelector(".btn-backspace");
const btnEqual = document.querySelector(".btn-equal");

let firstNum, secondNum, firstOperator, secondOperator;

btnClear.addEventListener("click", function () {
  lineBottom.textContent = "0";
  lineTop.innerHTML = "&nbsp;";
  firstNum = 0;
  secondNum = 0;
  firstOperator = "";
  secondOperator = "";
});

function appendNum() {
  for (let btn of btnNum) {
    btn.addEventListener("click", function () {
      if (lineBottom.textContent === "0") lineBottom.textContent = "";
      if (!firstNum) firstNum = btn.textContent;
      else secondNum = btn.textContent;
      lineBottom.textContent += `${btn.textContent}`;
    });
  }
}

function setOperator() {
  for (let btn of btnOperators) {
    btn.addEventListener("click", function () {
      if (!firstOperator) firstOperator = btn.textContent;
      if (lineBottom.textContent === "0") lineBottom.textContent = "";
      lineBottom.textContent += `${btn.textContent}`;
    });
  }
}

function calculate() {
  appendNum();
  setOperator();
  btnEqual.addEventListener("click", () => {
    lineTop.textContent = lineBottom.textContent;
    lineBottom.textContent = operate(firstOperator, firstNum, secondNum);
    firstNum = lineBottom.textContent;
    secondNum = 0;
    firstOperator = "";
    secondOperator = "";
  });
}

calculate();

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
    case "−":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "÷":
      if (y === 0) return null;
      else return divide(x, y);
    default:
      return null;
  }
}
