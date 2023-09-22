
const setBtn = document.getElementById('set');
const getBtn = document.getElementById('get');

setBtn.addEventListener('click', () => {
    const userId = 34253253;
    const user = {name: 'sirvan', age: 25};
    document.cookie = `uuid=${userId}`;
    document.cookie = `user=${JSON.stringify(user)};max-age=3`;
})

getBtn.addEventListener('click', () => {
    const cookieData = document.cookie.split(";");
    const data = cookieData.map(i => {
        return i.trim();
    }) 

    const index = data.findIndex(item => item.includes('user='));
    console.log(JSON.parse(data[index].split("=")[1]));
})