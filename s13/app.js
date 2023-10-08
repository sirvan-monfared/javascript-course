const btn = document.querySelector('button');
const wrapper = document.getElementById('wrapper');
const section = document.querySelector('section');

btn.addEventListener('click', event => {
    event.stopPropagation();

    console.log('clicked the BUTTON');
    console.log(event);
})
// wrapper.addEventListener('click', event => {
//     console.log('clicked the DIV -- captured');
//     console.log(event);
// }, true)

wrapper.addEventListener('click', event => {
    console.log('clicked the DIV -- bubbled');
    console.log(event);
})

