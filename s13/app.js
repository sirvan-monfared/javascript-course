const numberElm = document.getElementById('number');

numberElm.addEventListener('changeNumber', (event) => {
    console.log('triggered');
    console.log(event);

    event.target.textContent = event.detail.number;
    event.target.style.color = event.detail.color;
})

function change(color, number) {
    const event = new CustomEvent('changeNumber', {
        bubbles: true,
        detail: {
            color: color,
            number: number
        }
    });

    numberElm.dispatchEvent(event);
}