// class User {
//     constructor(name, lastName, age) {
//         this.name = name;
//         this.lastName = lastName;
//         this.age = age;

//         if (this.constructor.name === 'User') {
//             this.login();
//         }
//     }

//     login() {
//         console.log(`${this.name} ${this.lastName} is logged in`);
//     }

//     logout() {
//         console.log(`${this.name} ${this.lastName} is logged out`);
//     }
// }


// class Admin extends User {
//     constructor(name, lastName, age, permission) {
//         super(name, lastName, age);

//         this.permission = permission;
//         this.login();
//     }

//     login() {
//         console.log(`hey admin. welcome ${this.permission}`);
//     }

//     deleteUser() {
//         console.log('deleting...')
//     }
// }

// const sirvan = new User('sirvan', 'monfared', 25);

// const jack = new Admin('jack', 'milano', 32, 'SuperAdmin');

const User = function(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
}

User.prototype.login = function() {
    console.log(`${this.name} ${this.lastName} is logged in`);
}

const nima = new User('nima', 'maleki', 18);

const Admin = function(name, lastName, age, permission) {
    User.call(this, name, lastName, age);
    this.permission = permission;
}

Admin.prototype = Object.create(User.prototype);

Admin.prototype.deleteUser = function() {
    console.log(`${this.name} with ${this.permission} is deleting a user ...`); 
}

const sirvan = new Admin('sirvan', 'monfared', 25, 'Super Admin');
sirvan.login();


console.log(sirvan instanceof Admin);
console.log(sirvan instanceof User);
console.log(sirvan instanceof Object);

