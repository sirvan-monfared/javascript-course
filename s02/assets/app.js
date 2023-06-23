const defaultValue = 0;

let result = defaultValue;

const logEntries = [];


function writeOutput(initialResult, inputValue, operand)
{
    const operationDesc = `${initialResult} ${operand} ${inputValue}`;

    writeResult(result);

    writeOperation(operationDesc);

    // logEntries.push(inputValue);
    // console.log(logEntries);
}


function sum() {

    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result + inputValue;
    
    writeOutput(initialResult, inputValue, '+');


    const logObject = {
        operation: 'ADD',
        prevResult: initialResult,
        operand: inputValue,
        result: result
    }


    logEntries.push(logObject);
    console.log(logEntries);
}

function subtract() {
    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result - inputValue;
    
    writeOutput(initialResult, inputValue, '-');
}

function multiply() {
    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result * inputValue;
    
    writeOutput(initialResult, inputValue, '*');
}


function divide() {
    const initialResult = result;

    const inputValue = +inputElm.value;

    result = result / inputValue;
    
    writeOutput(initialResult, inputValue, '/');
}


addElm.addEventListener('click', sum);
minusElm.addEventListener('click', subtract);
multiplyElm.addEventListener('click', multiply);
divideElm.addEventListener('click', divide);
