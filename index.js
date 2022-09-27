// import inquirer
const inquirer = require('inquirer');
const htmlGen = require("./src/generateHTML.js");

async function main() {
    const employees = await getEmployees();
}

async function getEmployees() {

    // set up list of employees to send to html generator
    let employees = [];

    // use inquirer to prompt for manager data
    const managerAnswers = await inquirer.prompt([
        {
            name: "name",
            message: "Enter Manager's name",
            type: "input"
        },
        {
            name: "id",
            message: "Enter id number",
            type: "input"
        },
        {
            name: "email",
            message: "enter email",
            type: "input"
        },
        {
            name: "officeNumber",
            message: "enter office Number",
            type: "input"
        },
    ]);

    let manager = {
        type: "manager",
        name: managerAnswers.name,
        id: managerAnswers.id,
        email: managerAnswers.email,
        officeNumer: managerAnswers.officeNumber,
    }
    console.log(manager);


    // make a new instance of the manager class using user data

    // append it to our employees array
    employees.push(manager);

    let shouldContinue = true;

    // if we should continue asking for more employees, then prompt again for which type of employee
    while (shouldContinue) {

        // first prompt if the user wants to add another employee
        const continueAnswer = await inquirer.prompt([
            {
                name: "continue",
                message: "would you like to add another employee?",
                type: "confirm",
            },
        ]);
        // if user chooses not to continue ading employees, exit the loop with a break to avoid prompting
        shouldContinue = continueAnswer.continue;
        if(!shouldContinue) {
            break;
        }

        const employeeTypeAnswer = await inquirer.prompt([
            {
                name: "type",
                message: "which type of employee would you like to add?",
                type: "list",
                choices: ["engineer", "intern"]
            }
        ]);

        // set up object for temp employee data storage
        let employee = {
            type: employeeTypeAnswer.type
        }
        // once we know which type of employee to create, ask questions specific to that role
        if (employee.type == "engineer") {
            const employeeAnswer = await inquirer.prompt([
                {
                    name: "name",
                    message: "Enter Engineer's name",
                    type: "input"
                },
                {
                    name: "id",
                    message: "Enter id number",
                    type: "input"
                },
                {
                    name: "email",
                    message: "enter email",
                    type: "input"
                },
                {
                    name: "github",
                    message: "enter github username",
                    type: "input"
                }
            ]);

            // add this data to our temp employee object
            employee.name = employeeAnswer.name;
            employee.id = employeeAnswer.id;
            employee.email = employeeAnswer.email;
            employee.github = employeeAnswer.github;

        }
        else if (employee.type == "intern") {
            const employeeAnswer = await inquirer.prompt([
                {
                    name: "name",
                    message: "Enter Intern's name",
                    type: "input"
                },
                {
                    name: "id",
                    message: "Enter id number",
                    type: "input"
                },
                {
                    name: "email",
                    message: "enter email",
                    type: "input"
                },
                {
                    name: "school",
                    message: "enter school name",
                    type: "input"
                },
            ]);

            // add this data to our temp employee object
            employee.name = employeeAnswer.name;
            employee.id = employeeAnswer.id;
            employee.email = employeeAnswer.email;
            employee.github = employeeAnswer.school;
        }

        // now that we have gathered all of this employee's data,
        // create a new instance of the appropriate class for them

        // add it to the employees array
        employees.push(employee);
    }
    // once we exit the while loop, send our list of employees we've been buidling 
    htmlGen(employees);


}

getEmployees();