var mysql = require("mysql");
var inquirer = require("inquirer");
var chosenItem;
var price;
var stock;
var name;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) throw err;
    console.log("connected as id " + connection.threadId);
    listProducts();
});

function listProducts() { //-------------------------------Display ALL items-----------------------
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(error, results, fields) {
        console.log("\nID | Item Name | Department | Price\n");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].id + " | " + results[i].product_name + " | " + results[i].department_name + " | $" + results[i].price);
            console.log("-----------------------------------------");
        }

        inquirer.prompt([{ //----------------------Ask what item customer wants-------------
            type: "input",
            message: "Which item would you like to purchase (please enter an id)?\n",
            name: "bidChoice"

        }]).then(function(user) { //---------------Ask Quantity-----------------------//

                for (var i = 0; i < results.length; i++) {
                    if (parseInt(user.bidChoice) === results[i].id) {
                        var name = results[i].product_name;
                        price = results[i].price;
                        stock = results[i].stock_quantity;
                        console.log(name); //----------checking to see if proper item shows up-----
                    }
                }

            inquirer.prompt([{
                name: "quantity",
                type: "input",
                message: "Please choose a quantity for " + name,

            }]).then(function(user) { //---------------Check Quantity-------------------//
                console.log("User wants to purchase " + user.quantity + " unit(s) of " + name);
                var newQty = stock - user.quantity;

                //----------------------Placing Orders---------------------------------//
                console.log("----------Checking inventory--------------");
                if (newQty >= 0) {
                    console.log("Sufficient inventory to place order");
                    console.log("Order Total will be: $" + user.quantity * price + ".");
                    stock = stock - user.quantity;
                    console.log("Thank you your order has been placed!");
                    console.log("Updating inventory...\n");
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: stock = newQty

                            },
                            {
                                product_name: name
                            }
                        ],
                        function(error, results) {

                        }
                    );
                    console.log(name + ": Inventory Remaining = " + stock);
                    connection.end();
                } else {
                    console.log("Insufficient Quantity! Items left in inventory: " + stock);
                    inquirer.prompt([{
                        type: "confirm",
                        message: "Return to main product list?",
                        name: "confirm",
                        default: true
                    }]).then(function(user) {
                        if (user.confirm) {
                            listProducts();
                        } else {
                            connection.end();
                        }
                    });

                }

            });
        });

    });

}
