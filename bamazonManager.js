var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var choice;
var invAdd;
var amountAdd;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) throw err;
    managerOptions();
});

function managerOptions() {
    inquirer.prompt([{
        type: 'list',
        name: 'operation',
        message: 'What do you want to do?',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ]
    }, ]).then(function(answer) {
        //console.log(JSON.stringify(answer, null, '  '));

        choice = answer.operation;

        switch (choice) {
            case "View Products for Sale":
                listProducts();
                break;

            case "View Low Inventory":
                viewLow();
                break;

            case "Add to Inventory":
                updateInv();
                break;

            case "Add New Product":
                createProduct();
                break;

            default:
                connection.end();
                break;

        }

    });
}

function listProducts() { //-------------------------------Display ALL items-----------------------
    var table = new Table({
        head: ['ItemID', 'ProductName', 'Department', 'Price', 'Quantity'],
        colWidths: [10, 20, 20, 10, 10]
    });
    connection.query("SELECT * FROM products", function(error, results, fields) {
        for (var i = 0; i < results.length; i++) {
            var bamTable = [results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity];
            table.push(bamTable);
        }
        console.log(table.toString());
        connection.end();
    });
}

function viewLow() {
    console.log("Showing proudcts with an inventory less than 5...\n");
    var table = new Table({
        head: ['ItemID', 'Department', 'ProductName', 'Price', 'Quantity'],
        colWidths: [10, 20, 20, 10, 10]
    });
    connection.query("SELECT * FROM products", function(error, results) {

        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 5) {
                var lowTable = [results[i].id, results[i].department_name, results[i].product_name, results[i].price, results[i].stock_quantity];
                table.push(lowTable);

            }
        }
        console.log(table.toString());
        console.log("\nAll other items meet acceptable stock");
        connection.end();
    });

}

function updateInv() {

    inquirer.prompt([{
            type: "input",
            message: "Which item would you like to add more inventory to?",
            name: "addInv",
        },
        {
            type: "input",
            message: "How many would you like to add?",
            name: "amount"
        }

    ]).then(function(user) {

        console.log("Manager adding " + user.amount + " unit(s) to: " + user.addInv);
        connection.query("SELECT * FROM products WHERE ?", [{
            product_name: user.addInv
        }], function(error, results) {
            if (error) throw err;
            var updateAmount = (parseInt(results[0].stock_quantity) + parseInt(user.amount));

            var query = connection.query(
                "UPDATE products SET ? WHERE ?", [{
                        stock_quantity: parseInt(results[0].stock_quantity) + parseInt(user.amount)
                    },
                    {
                        product_name: user.addInv
                    }
                ],
                function(error, results) {
                    console.log(results.affectedRows + " products updated!\n");
                    connection.end();
                }
            );
            //console.log(query.sql);
        });

    });
}

function createProduct() {

    inquirer.prompt([{
            type: "input",
            message: "What item would you like to add?",
            name: "name",
        },
        {
            type: "input",
            message: "Which department would you like to add your item to?",
            name: "dept",
        },
        {
            type: "input",
            message: "How much is the item's asking price?",
            name: "cost",
        },
        {
            type: "input",
            message: "How many units would you like to add to avialable inventory?",
            name: "inv",
        },
    ]).then(function(answers) {

        console.log("Inserting a new product...\n");
        var query = connection.query(
            "INSERT INTO products SET ?", {
                product_name: answers.name,
                department_name: answers.dept,
                price: answers.cost,
                stock_quantity: answers.inv
            },

            function(err, res) {
                console.log(res.affectedRows + " product inserted!\n");
                listProducts(query);

            }
        );

    });

}
