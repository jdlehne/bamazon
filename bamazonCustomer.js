var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //connection.end();
    listProducts();
});

function listProducts() { //-------------------------------Display ALL items-----------------------
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(error, results, fields) {
        if (error) throw error;
        results.forEach(function(row) {
            fields.forEach(function(field) {
                console.log(field.name + ": " + row[field.name]);
            });
        });

        inquirer.prompt([{ //-----------------------------------Ask what item customer wants-------------
            type: "input",
            message: "Which item would you like to purchase (please enter an id number or item name)?",
            name: "bidChoice"

        }]).then(function(user) { //---------------Ask Quantity-----------------------//
            var chosenItem = user.bidChoice;
            inquirer.prompt([{
                name: "quantity",
                type: "input",
                message: "Please choose a quantity for " + user.bidChoice,
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;

                    }
                    return false;
                }
            }]).then(function(user) { //---------------Check Quantity-------------------//
                console.log(user.quantity);
                console.log("User Requested: " + chosenItem + " : " + user.quantity);

                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === chosenItem) {
                        chosenItem = results[i];
                        //console.log(chosenItem);//----------checking to see if proper item shows up
                    }
                }
                //----------------------Placing Orders---------------------------------//
                console.log("----------Checking inventory--------------");
                if (user.quantity < chosenItem.stock_quantity) {
                    console.log("Sufficient inventory to place order");
                    console.log("Order Total will be: $" + user.quantity * chosenItem.price + ".");
                    chosenItem.stock_quantity = chosenItem.stock_quantity - user.quantity;
                    console.log(chosenItem.product_name + ": Inventory Remaining = " + chosenItem.stock_quantity);


                } else {
                    console.log("Insufficient Quantity!");
                }

            })
        });

        connection.end();
    });
}
