function sayHello() {
    console.log('heyyy');
}

console.log('asfsafsa');

const tme = setTimeout(sayHello, 3000);

console.log('after setTimeout');

const intval = setInterval(() => {
    console.log('called');
}, 2000, [])

const buttonElm = document.getElementById('stop');

buttonElm.addEventListener('click', () => {
    // clearInterval(intval);
    clearTimeout(intval);
})