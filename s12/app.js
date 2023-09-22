
const setBtn = document.getElementById('set');
const getBtn = document.getElementById('get');

setBtn.addEventListener('click', () => {
    const user = {
        name: 'sirvan',
        lastName: ' monfared'
    };

    localStorage.setItem('uuid', JSON.stringify(user));
})

getBtn.addEventListener('click', () => {
    const uuid = localStorage.getItem('uuid');
    
    if (uuid) {
        console.log(JSON.parse(uuid));
    } else {
        console.log('sorry not exists');
    }
})