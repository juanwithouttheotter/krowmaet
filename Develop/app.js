const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");
const employees = [];
const questions = [
  {
    type: 'list',
    message: 'What is their role?',
    name: 'role',
    choices: ['Manager', 'Engineer', 'Intern']
  },
  {
    type: 'input',
    message: 'What is their name?',
    name: 'name'
  },
  {
    type: 'input',
    message: 'What is their id?',
    name: 'id'
  },
  {
    type: 'input',
    message: 'What is their email?',
    name: 'email'
  },
  {
    type: 'input',
    message: 'What is their office number?',
    name: 'officeNumber',
    when: (answers) => answers.role === 'Manager'
  },
  {
    type: 'input',
    message: 'What is their Github username?',
    name: 'github',
    when: (answers) => answers.role === 'Engineer'
  },
  {
    type: 'input',
    message: 'What is their school?',
    name: 'school',
    when: (answers) => answers.role === 'Intern'
  },
  {
    type: 'confirm',
    message: 'Would you like to add another employee?',
    name: "newEmployee",
    default: true
  }
];

function teamBuilder() {
  inquirer.prompt(questions).then(answers => {

    if (answers.role === "Intern") {
      const { name, id, email, school } = answers;
      employee = new Intern(name, id, email, school);
    } else if (answers.role === "Manager") {
      const { name, id, email, officeNumber } = answers;
      employee = new Manager(name, id, email, officeNumber);
    } else if (answers.role === "Engineer") {
      const { name, id, email, github } = answers;
      employee = new Engineer(name, id, email, github);
    }

    employees.push(employee);

    if (answers.newEmployee) {
      teamBuilder();
    } else {
      fs.writeFile(outputPath, render(employees), function (err) {
        if (err) throw err;
        console.log('Your team page is made!');
      });

    }
  });
}
teamBuilder();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
