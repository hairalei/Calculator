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
let isOperatorPressed = false;
let num = 0;
let operatorCount = 0;

btnClear.addEventListener("click", function () {
  lineBottom.textContent = "0";
  lineTop.innerHTML = "&nbsp;";
  num = 0;
  firstNum = 0;
  secondNum = 0;
  firstOperator = "";
  secondOperator = "";
  operatorCount = 0;
  isOperatorPressed = false;
});

function appendNum() {
  for (let btn of btnNum) {
    btn.addEventListener("click", function () {
      if (lineBottom.textContent === "0") lineBottom.textContent = "";
      num += btn.textContent;
      lineBottom.textContent += `${btn.textContent}`;

      if (firstNum && secondNum) lineBottom.textContent = `${btn.textContent}`;

      // console.log(firstNum, secondNum, num);
    });
  }
}

function storeNum() {
  !firstNum ? (firstNum = num) : (secondNum = num);
  num = 0;
}

function setOperator() {
  for (let btn of btnOperators) {
    btn.addEventListener("click", function () {
      operatorCount++;
      storeNum();
      if (!firstOperator) firstOperator = btn.textContent;
      //   if (lineBottom.textContent === "0") lineBottom.textContent = "";
      lineBottom.textContent += `${btn.textContent}`;

      if (operatorCount >= 2) {
        calculate();
        lineBottom.textContent = firstNum;
        lineBottom.textContent += `${btn.textContent}`;
      }
      // console.log(firstNum, secondNum, num, isOperatorPressed);
    });
  }
}

function calculator() {
  appendNum();
  setOperator();
  btnEqual.addEventListener("click", (e) => {
    // console.log(firstNum, secondNum, num, isOperatorPressed);
    storeNum();

    isOperatorPressed = true;
    calculate();
  });
}

function calculate() {
  lineTop.textContent = lineBottom.textContent;
  lineBottom.textContent = operate(firstOperator, firstNum, secondNum);
  console.log(operate(firstOperator, firstNum, secondNum));
  firstNum = lineBottom.textContent;
  secondNum = 0;
  firstOperator = "";
  secondOperator = "";
}

calculator();

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
      if (y === 0) return "error";
      else return divide(x, y);
    default:
      return null;
  }
}
