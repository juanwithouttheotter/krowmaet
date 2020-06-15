// TODO: Write code to define and export the Employee class

module.exports = class Employee {
    constructor(answers){
        this.name = answers.name;
        this.id = answers.id;
        this.email = answers.email;
        this.role = answers.role;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return this.role;
    }
}

