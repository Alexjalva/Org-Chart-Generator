const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const empArray = [];
let newEmp;

//Function that goes through the employee building process
function getEmployee() {
    //Asks users if they would like to enter another employee
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to enter another employee?',
            name: 'continue'
        }
        //proceeds to employee questions if they confirmed. 
    ]).then(answer => {
        if (answer.continue) {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: "What role would you like to enter?",
                        name: 'type',
                        choices: ["Engineer", "Intern", "Manager"]
                    },
                    {
                        type: 'input',
                        message: "What is the employee's name?",
                        name: 'name',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's ID?",
                        name: 'id',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's email address?",
                        name: 'email',
                    },
                ])
                //takes generic answers and proceeds to more specific questions
                .then(answers => {
                    //switch statement that proceeds depending on the type of employee being built. asks teh specific question and then recursively starts the process again. 
                    switch (answers.type) {
                        case "Engineer":
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        message: "What is the employee's github username?",
                                        name: 'github',
                                    }
                                ])
                                .then(response => {
                                    newEmp = new Engineer(answers.name, answers.id, answers.email, response.github);
                                    empArray.push(newEmp);
                                    
                                    return getEmployee();
                                })
                            break;
                        case "Intern":
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        message: "Where does the employee attend school?",
                                        name: 'school',
                                    }
                                ])
                                .then(response => {
                                    newEmp = new Intern(answers.name, answers.id, answers.email, response.school);
                                    empArray.push(newEmp);
                                    
                                    return getEmployee();
                                })
                            break;
                        case "Manager":
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        message: "What is the manager's office number?",
                                        name: 'officeNumber',
                                    }
                                ])
                                .then(response => {
                                    newEmp = new Manager(answers.name, answers.id, answers.email, response.officeNumber);
                                    empArray.push(newEmp);
                                    
                                    return getEmployee();
                                })
                            break;
                    }

                })
        }
        //when the user finally answers that they do not want to add another employee, it writes the data collected so far. 
        else {
            fs.mkdir(OUTPUT_DIR,
                { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }

                });
            fs.writeFile(outputPath, render(empArray), function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Your Employees have successfully been organized");

            });

        }

    })

}
getEmployee();
