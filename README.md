# bamazon
Bamazon is a command line Node application that uses mySQL as a databse to store and track products and product sales information.  It has two features, A customer app that allows users to browse products and purchase music instruments and gear, and a manager app that allows the operator to check what products are available, what is low in inventory, add to any inventory and insert new products.

<h2>Bamazon Customer</h2>

This node app starts by running the command 'node bamazonCustomer' in the command line, which shows the 'customer' a list of available products stored in the database.  The database tracks the items, their department, price and quantity in stock.

![](https://i.imgur.com/UvB26mH.png)

When the user decides which product they would like to purchase they can enter the ItemID listed to the left of the product.

![](https://i.imgur.com/oHWsbcd.png)

![](https://i.imgur.com/lqcw2Pb.png)

After you enter which product you would like you will then be prompted for a quantity:

![](https://i.imgur.com/44nSWhD.png)

Bamazon will then check the inventory in the database and place an order if there is enough supply to meet the request, showing the customer
the order total for their purchase, then it will update the remaining inventory and total sales for that product in the database and log
that for tracking purposes.

![](https://i.imgur.com/QlAfRTF.png)

In the event that there is not enough inventory to meet the order the customer will be informed that there is an insufficient quantity,
be shown the amount that is in stock and be asked if they would like to return to the product page and make another selection:

![](https://i.imgur.com/3hPyoas.png)

<h2>Bamazon Manager</h2>

This feature begins by running the 'node bamazonManager' command and prompts the 'manager' with a list of options to choose from.

![](https://i.imgur.com/tx7PwvJ.png)


'View Products for Sale' will again display a table of all the available products and the related stats on them:

![](https://i.imgur.com/jSufhgd.png)

'View Low Inventory' will show all products with 5 or less available units:

![](https://i.imgur.com/n5NaTMA.png)

'Add to Inventory'  Will allow the 'manager' to replenish stock in any item available, by asking which product they want to add to and how many units:

![](https://i.imgur.com/ZQbhm2A.png)

The last function 'Add New Product' allows prompts the user to enter the information about a new product, once entered it is sent and stored in the database, and then an updated product sheet is shown with the new item added below:

![](https://i.imgur.com/V2NWJZr.png)
