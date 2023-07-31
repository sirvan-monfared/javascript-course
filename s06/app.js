const button = document.querySelector('button');
const li = document.querySelector('li');

button.addEventListener('click', () => {
    li.classList.toggle('active');
    // if (li.classList.contains('active')) {
    //     li.classList.remove('active');
    // } else {
    //     li.classList.add('active');
    // }
})