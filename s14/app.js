const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getLocation()
.then((position) => console.log(position))
.catch((error) => console.log(error));




// const requestCar = () => {
//    return new Promise((resolve, reject) => {
//         const random = Math.random();
//         if (random > 0.7) {
//             resolve("YOU WON! " + random);
//         } else {
//             reject("YOU LOST! " + random);
//         }
//     })
// }

// const timer = (seconds) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, seconds * 1000);
//     })
// }

// let message;
// requestCar()
// .then((data) => {
//     console.log('wait ...')
//     message = data;
//     return timer(2);
// })
// .then(() => {
//     console.log(message);
// })
// .catch((error) => console.log('noo', error));


