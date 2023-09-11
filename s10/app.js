const Car = function(model, speed) {
    this.model = model;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    this.speed += 15;
    console.log(`your ${this.model} speed is ${this.speed} km/h`);
}

Car.prototype.brake = function() {
    this.speed -= 10;
    console.log(`your ${this.model} speed is ${this.speed} km/h`);
}

const dena =  new Car('Dena', 120);
const bmw = new Car('bmw', 150);

dena.accelerate();
dena.accelerate();
dena.accelerate();
dena.brake();
dena.accelerate();


bmw.accelerate();
bmw.brake();
bmw.accelerate();