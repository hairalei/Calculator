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

//Event listeners
