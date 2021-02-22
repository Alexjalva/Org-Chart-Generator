// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = "Employee";
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }
    getEmail(){
        return this.email;
    }
}
module.exports = Employee;