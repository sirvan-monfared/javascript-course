/* ----------------------------- 
        4 Pillars of OOP
------------------------------*/

/* 1- Abstraction */
class Car {
    color;
    model;
    gear;
    oil;
    gas;
    material;
    gearMaterial;
    TiresElasticity;
    brakePercision;

    start() {}
    accelerate() {}
    brake() {}

    igniteEngine() {}
    pumpOil() {}
    pumpGas() {}
    moveTires() {}
    Radiator() {}
    ControlWaterHeat() {}
}

class Car {
    color;
    model;
    gear;

    start() {}
    accelerate() {}
    brake() {}
}

GamepadButton.addEventListener('click', someFunction);



/* 2- Encapsulation */
// Public Interface (API)
// Internal Properties and methods (private)

// note that theses syntaxes are not supported in javascript and this is just a contexual Example for OOP Concept
class BankAccount {
    accountCode;
    private accountPassword;
    movements;

    login(userInput) {
        return this.accountPassword === userInput;
    }

    deposite(value) {
        this.movements.push(value);
    }

    withdraw(value) {
        this.deposite(-value);
    }

    private hasEnoughCredit() {
        // some calculation to check if user has enough credits for a loan
        return (someCondition) ? true : false;
    }

    getLoan(amount)  {
        if (this.hasEnoughCredit()) {
            this.deposite(amount);
            return true;
        }

        return false;
    }
}
new BankAccount().getLoan(10000000)

new BankAccount().accountPassword = 454544

/* 3- Inheritance */
class User {
    name;
    lastName;

    login() {}
    logout() {}
}

class Admin extends User {
    permission;

    deleteUser() {}
}



/* 4- PolyMorphism */
class User {
    name;
    lastName;

    login() {
        console.log(`hey ${name}`);
    }
    logout() {}
}

class Admin extends User {
    permission;

    deleteUser() {}
    login() {
        console.log(`hello sir! ${name} ${lastName}. welcome to your panel`);
    }
}

class Author extends User {
    login() {
        alert('la la la')
    }
}

