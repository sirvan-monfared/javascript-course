
const requestCar = () => {
   return new Promise((resolve, reject) => {
        const random = Math.random();
        if (random > 0.7) {
            resolve("YOU WON! " + random);
        } else {
            reject("YOU LOST! " + random);
        }
    })
}

const timer = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
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
            console.log(data);
            await timer(2);
            const position = await getLocation();
        } catch(error) {
            console.log('an error accoured')
            console.log(error);
        }

        console.log('function finished...')

        

        // timer(3)
        // .then(() => {
        //     return requestCar();
        // })
        // .then((data) => {
        //     console.log(data);
        //     console.log('wait again...');
        //     return timer(2);
        // })
        // .then(() => {
        //     console.log('getting your location..');
        //     return getLocation();
        // })
        // .then((data) => console.log(data))
        // .catch(error => console.log(error));
}

doSomStuff()


