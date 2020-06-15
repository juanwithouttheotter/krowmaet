// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');

class Manager extends Employee {
    constructor (answers) {
        this.officeNumber = answers.officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}