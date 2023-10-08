const ul = document.querySelector('ul');
const form = document.querySelector('form');
const btn = document.querySelector('button');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log('submitted');
    /// validating inputs
})

btn.addEventListener('click', function(event) {
    console.log(event.target === this);

    console.log('clicked');
})



// liItems.forEach(item => {
//     item.addEventListener('click', event => {
//         event.target.classList.toggle('active');
//     })
// })

ul.addEventListener('click', function(event) {

    console.log(this === event.currentTarget)
    event.target.closest('li').classList.toggle('active');
})