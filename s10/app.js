class User {
    constructor(name, lastName, age) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;

        if (this.constructor.name === 'User') {
            this.login();
        }
    }

    login() {
        console.log(`${this.name} ${this.lastName} is logged in`);
    }

    logout() {
        console.log(`${this.name} ${this.lastName} is logged out`);
    }
}


class Admin extends User {
    constructor(name, lastName, age, permission) {
        super(name, lastName, age);

        this.permission = permission;
        this.login();
    }

    login() {
        console.log(`hey admin. welcome ${this.permission}`);
    }

    deleteUser(user) {
        users = users.filter(u => {
            return u.name !== user.name
        })

        console.log(users);
    }
}

const sirvan = new User('sirvan', 'monfared', 25);
console.log(sirvan.constructor.name);
// const maryam = new User('maryam', 'tahani', 29);
// const ghazal = new User('ghazal', 'abbaskhanian', 28);

const jack = new Admin('jack', 'milano', 32, 'SuperAdmin');
console.log(jack.constructor.name)
// jack.login();
// let users = [sirvan, maryam, ghazal, jack];



