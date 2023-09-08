const Person = function(name, lastName) {
    // instance properties
    this.name = name;
    this.lastName = lastName;

    // do not define methods like this in constructor function
    // this.fullName = function() {
    //     console.log(this.name + ' ' + this.lastName);
    // }
}

const person1 = new Person('sirvan', 'monfared');
const person2 = new Person('nimal', 'maleki');
const person3 = new Person('maryam', 'tahani');
// console.log(person1, person2, person3);

person1.fullName();



// 1. creates new {}
// 2. function called, this points to newly created {}
// 3. {} links to prototype
// 4- returns automiatically the created {}
