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

  const initialResult = result;
  const inputValue = +inputElm.value;

  if (
    operation !== "ADD" &&
    operation !== "SUBTRACT" &&
    operation !== "MULTIPLY" &&
    operation !== "DIVIDE" ||
    !inputValue
  ) {
    alert("YOU CHOSE AN INVALID OPERATION OR NUMBER");
    return;
  }

  //   if ( operation === "ADD" || operation === "SUBTRACT" || operation === "MULTIPLY" || operation === "DIVIDE") {
  

  

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

addElm.addEventListener("click", calculate.bind(this,"ADD"));
minusElm.addEventListener("click", calculate.bind(this, "SUBTRACT"));
multiplyElm.addEventListener("click", calculate.bind(this, "MULTIPLY"));
divideElm.addEventListener("click", calculate.bind(this, "DIVIDE"));
