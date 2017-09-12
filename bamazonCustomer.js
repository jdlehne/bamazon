var mysql = require("mysql");
var inquirer = require("inquirer");

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
    //connection.end();
    listProducts();
});

function listProducts() { //-------------------------------Display ALL items-----------------------
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(error, results, fields) {
      /*console.log("\nID | Item Name | Department | Price\n");
      for (var i = 0; i < results.length; i++) {
          console.log(results[i].id + " | " + results[i].product_name + " | " + results[i].department_name + " | $" + results[i].price);
          console.log("-----------------------------------------");
      }

      console.log("Which item would you like to purchase (please enter an id)?");*/
        if (error) throw error;
        results.forEach(function(row) {
            fields.forEach(function(field) {
                console.log(field.name + ": " + row[field.name]);
            });
        });

        inquirer.prompt([{ //-----------------------------------Ask what item customer wants-------------
            type: "input",
            message: "Which item would you like to purchase (please enter an id)?\n",
            name: "bidChoice"

        }]).then(function(user) { //---------------Ask Quantity-----------------------//
            var chosenItem = parseInt(user.bidChoice);
            console.log("The id is: " + chosenItem);
            for (var i = 0; i < results.length; i++) {
              //console.log(results[i].id + " : " + results[i].product_name);
                if (parseInt(chosenItem) === results[i].id) {
                  chosenItem = results[i].product_name;
                  var price = results[i].price;
                  var stock = results[i].stock_quantity;
                  console.log(chosenItem);  //----------checking to see if proper item shows up-----
                }
            }

            inquirer.prompt([{
                name: "quantity",
                type: "input",
                message: "Please choose a quantity for " + chosenItem,
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }]).then(function(user) { //---------------Check Quantity-------------------//
                console.log("User Requested: " + chosenItem + " : " + user.quantity);
                console.log(price);
                //----------------------Placing Orders---------------------------------//
                console.log("----------Checking inventory--------------");
                if (user.quantity < stock) {
                    console.log("Sufficient inventory to place order");
                    console.log("Order Total will be: $" + user.quantity * price + ".");
                    stock = stock - user.quantity;
                    console.log("Thank you your order has been placed!");
                    console.log("Updating inventory...\n");
                    var query = connection.query(
                      "UPDATE products SET ? WHERE ?",
                      [
                        {
                          stock_quantity: stock = stock - user.quantity

                        },
                        {
                          product_name: chosenItem
                        }
                      ],
                      function(error, results) {
                        //console.log(results.affectedRows + " products updated!\n");
                      }
                    );
                    console.log(chosenItem + ": Inventory Remaining = " + stock);
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
        //connection.end();
    });
}
