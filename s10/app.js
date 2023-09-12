// const Car = function(model, speed) {
//     this.model = model;
//     this.speed = speed;
// }

// Car.prototype.accelerate = function() {
//     this.speed += 15;
//     console.log(`your ${this.model} speed is ${this.speed} km/h`);
// }

// Car.prototype.brake = function() {
//     this.speed -= 10;
//     console.log(`your ${this.model} speed is ${this.speed} km/h`);
// }

// Car.goToParking = function() {
//     console.log('heyyy');
// }

// const dena =  new Car('Dena', 120);
// const bmw = new Car('bmw', 150);

// Car.goToParking()
// dena.goToParking();

// dena.accelerate();
// dena.accelerate();
// dena.accelerate();
// dena.brake();
// dena.accelerate();




// class Person {
//     constructor(name, lastName, age) {
//         this.name = name;
//         this.lastName = lastName;
//         this.age = age;
//     }

//     // instance methods
//     fullName() {
//         return `your name is ${this.name} ${this.lastName} and your age is ${this.age}`;
//     }

//     sayHello() {
//         alert(this.fullName())
//     }

//     // static methods
//     static goToParking() {
//         console.log('heyyy');
//     }
// }



// const sirvan = new Person('sirvan', 'monfared', 25);
// console.log(sirvan);

// console.log(sirvan.__proto__ === Person.prototype);

// console.log(sirvan.fullName());

// Person.goToParking()

// sirvan.goToParking();

const proto = {
    init(name, lastName, age) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
    },

    fullName() {
        return `your name is ${this.name} ${this.lastName} and your age is ${this.age}`;
    }
}

const sirvan = Object.create(proto);
// sirvan.name = 'sirvan';
// sirvan.lastName = 'monfared';
// sirvan.age = 25;
sirvan.init('sirvan', 'monfared', 25);

console.log(sirvan);
console.log(sirvan.fullName())
// console.log(sirvan.__proto__ === proto)