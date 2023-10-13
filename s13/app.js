const tooltip = document.getElementById('tooltip');

function showTooltip(text, x, y) {
    tooltip.innerText = text;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

document.body.addEventListener('mouseover', (event) => {

    const target = event.target;

    if (! target.classList.contains('tooltip-trigger')) {
        return;
    }

    const tooltiptext = target.getAttribute('data-tooltip');
    const tooltipX = target.offsetLeft; 
    const tooltipY = target.offsetTop + target.offsetHeight + 10;

    
    document.dispatchEvent(
        new CustomEvent('show-tooltip', {
            detail: {
                text: tooltiptext,
                x: tooltipX,
                y: tooltipY
            }
        })
    );
})

document.body.addEventListener('mouseout', (event) => {
    const target = event.target;

    if (! target.classList.contains('tooltip-trigger')) {
        return;
    }

    document.dispatchEvent(
        new CustomEvent('hide-tooltip')
    );
})

document.addEventListener('show-tooltip', (event) => {
    const {text, x, y} = event.detail;
    showTooltip(text, x, y);
})

document.addEventListener('hide-tooltip', (event) => {
    hideTooltip();
})