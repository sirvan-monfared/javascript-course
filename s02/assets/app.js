const defaultValue = 0;

let result = defaultValue;

const logEntries = [];


function writeOutput(initialResult, inputValue, operand)
{
    const operationDesc = `${initialResult} ${operand} ${inputValue}`;

    writeResult(result);

    writeOperation(operationDesc);
}

function createLogOutput(operationId, prevResult, inputValue, finalResult)
{
    const logObject = {
        operation: operationId,
        prevResult: prevResult,
        operand: inputValue,
        result: finalResult
    }

    logEntries.push(logObject);
    console.log(logEntries);
}


function sum() {

    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result + inputValue;
    
    writeOutput(initialResult, inputValue, '+');

    createLogOutput('ADD', initialResult, inputValue, result);
    
}

function subtract() {
    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result - inputValue;
    
    writeOutput(initialResult, inputValue, '-');


    createLogOutput('SUBTRACT', initialResult, inputValue, result);
}

function multiply() {
    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result * inputValue;
    
    writeOutput(initialResult, inputValue, '*');

    createLogOutput('MULTIPLY', initialResult, inputValue, result);
}


function divide() {
    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result / inputValue;
    
    writeOutput(initialResult, inputValue, '/');

    createLogOutput('DIVIDE', initialResult, inputValue, result);
}


addElm.addEventListener('click', sum);
minusElm.addEventListener('click', subtract);
multiplyElm.addEventListener('click', multiply);
divideElm.addEventListener('click', divide);
