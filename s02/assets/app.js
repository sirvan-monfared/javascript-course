const defaultValue = 0;

let result = defaultValue;

const logEntries = [];

function writeOutput(initialResult, inputValue, operand) {
  const operationDesc = `${initialResult} ${operand} ${inputValue}`;

  writeResult(result);

  writeOperation(operationDesc);
}

function createLogOutput(operationId, prevResult, inputValue, finalResult) {
  const logObject = {
    operation: operationId,
    prevResult: prevResult,
    operand: inputValue,
    result: finalResult,
  };

  logEntries.push(logObject);
  console.log(logEntries);
}

function calculate(operation) {
  if (
    operation !== "ADD" &&
    operation !== "SUBTRACT" &&
    operation !== "MULTIPLY" &&
    operation !== "DIVIDE"
  ) {
    alert("YOU CHOSE AN INVALID OPERATION");
    return;
  }

  //   if ( operation === "ADD" || operation === "SUBTRACT" || operation === "MULTIPLY" || operation === "DIVIDE") {
  const initialResult = result;

  const inputValue = +inputElm.value;

  let operator;

  if (operation === "ADD") {
    result = result + inputValue;
    operator = "+";
  } else if (operation === "SUBTRACT") {
    result = result - inputValue;
    operator = "-";
  } else if (operation === "MULTIPLY") {
    result = result * inputValue;
    operator = "*";
  } else if (operation === "DIVIDE") {
    result = result / inputValue;
    operator = "/";
  }

  createLogOutput(operation, initialResult, inputValue, result);
  writeOutput(initialResult, inputValue, operator);
  //   } else {
  //     alert('YOU CHOSE AN INVALID OPERATION');
  //   }
}

function sum() {
  calculate("ADDZZZZZZ");
}

function subtract() {
  calculate("SUBTRACT");
}

function multiply() {
  calculate("MULTIPLY");
}

function divide() {
  calculate("DIVIDE");
}

addElm.addEventListener("click", sum);
minusElm.addEventListener("click", subtract);
multiplyElm.addEventListener("click", multiply);
divideElm.addEventListener("click", divide);
