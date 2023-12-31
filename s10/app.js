

class BankAccount {
    
    #transactions;
    #accountCode;

    constructor(owner, currency) {
        this.owner = owner;
        this.currency = currency;
        
        this.#transactions = [];
        this.#accountCode = 'some random code';
    }

    verifyAccount(userInput) {
        return this.#accountCode === userInput
    }

    deposite(value) {
        this.#transactions.push(value);

        return this;
    }

    withdraw(value) {
        return this.deposite(-value);
    }

    #hasEnoughCredit() {
        let someCondition = '';
        // some calculation to check if user has enough credits for a loan
        return (someCondition) ? true : false;
    }

    getLoan(amount)  {
        if (this.#hasEnoughCredit()) {
            this.deposite(amount);

            return true;
        }

        return false;
    }
}

const account = new BankAccount('sirvan monfared', 'RIAL');
console.log(account.deposite(1000).deposite(5564).withdraw(100).withdraw(100).getLoan(454654654))
