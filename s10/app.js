const Person = function(name, lastName) {
    this.name = name;
    this.lastName = lastName;
}

const sirvan = new Person('sirvan', 'monfared');

// 1. creates new {}
// 2. function called, this points to newly created {}
// 3. {} links to prototype  __proto__
// 4- returns automiatically the created {}

Person.prototype.fullName = function() {
    console.log(this.name + ' ' + this.lastName);
}

sirvan.fullName();

