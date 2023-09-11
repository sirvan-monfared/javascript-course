const arr = [1, 10, 15, 17, 15, 10, 9, 13];

// arr = new Array(1, 10, 15, 17)  Object

Array.prototype.unique = function() {
    return [...new Set(this)];
}

console.log(arr.__proto__.__proto__.__proto__)

console.log(arr.unique())

console.log([10,15,6,6,8,9,9,14].unique())

const obj = { name: 'sirvan'};
// const obj = new Object()   obj.name = 'sirvn'  Object.prototype == obj.__proto__

const h1 = document.querySelector('h1');

console.dir(x => x + 1)