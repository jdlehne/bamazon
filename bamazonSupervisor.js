var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) throw err;
    superOptions();
});

function superOptions() {
    inquirer.prompt([{
        type: 'list',
        name: 'operation',
        message: 'What do you want to do?',
        choices: [
            'View Products Sales',
            'Create New Department'
        ]
    }, ]).then(function(answer) {

        choice = answer.operation;

        switch (choice) {
            case 'View Products Sales':
                listProducts();
                break;

            case 'Create New Department':
                console.log("2");
                break;

            default:
                connection.end();
                break;

        }

    });
}

function listProducts() { //-------------------------------Display ALL items-----------------------
    var table = new Table({
        head: ['department_id', 'department_name', 'over_head_costs'],
        colWidths: [20, 20, 20,]
    });
    connection.query("SELECT * FROM departments", function(error, results, fields) {
        for (var i = 0; i < results.length; i++) {
            var superTable = [results[i].department_id, results[i].department_name, results[i].over_head_costs,];
            table.push(superTable);
        }
        console.log(table.toString());
    });

  }
