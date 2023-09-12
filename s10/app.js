class User {
    constructor(name, lastName, age, permission) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.permission = permission
    }

    login() {
        console.log(`${this.name} ${this.lastName} are logged in`);
    }

    logout() {
        console.log(`${this.name} ${this.lastName} are logged out`);
    }
}


class Admin extends User {

    deleteUser(user) {
        users = users.filter(u => {
            return u.name !== user.name
        })

        console.log(users);
    }
}

const sirvan = new User('sirvan', 'monfared', 25);
const maryam = new User('maryam', 'tahani', 29);
const ghazal = new User('ghazal', 'abbaskhanian', 28);
// sirvan.deleteUser()

const jack = new Admin('jack', 'milano', 32, 'SuperAdmin');

let users = [sirvan, maryam, ghazal, jack];
console.log(jack);

// jack.deleteUser(sirvan);

sirvan.delteUser(ghazal);


