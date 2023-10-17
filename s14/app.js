
const requestCar = () => {
   return new Promise((resolve, reject) => {
        const random = Math.random();
        if (random > 0.8) {
            resolve("YOU WON! " + random);
        } else {
            reject("YOU LOST! " + random);
        }
    })
}

const timer = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('done!');
        }, seconds * 1000);
    })
}

const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

const doSomStuff = async () => {
    try {
        await timer(3);
        const data = await requestCar();
        await timer(2);
        const position = await getLocation();
    } catch(error) {
        console.log(error);
    }

    console.log('finished....')
}



