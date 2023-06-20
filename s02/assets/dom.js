
const addElm = document.querySelector('#plus');
const minusElm = document.querySelector('#minus');
const multiplyElm = document.querySelector('#multiply');
const divideElm = document.querySelector('#divide');
const inputElm = document.querySelector('#input');
const resultElm = document.querySelector('#result');
const operationElm = document.querySelector('#operation');

function writeResult(result)
{
    resultElm.innerHTML = result;
}

function writeOperation(operation)
{
    operationElm.innerHTML = operation;
}