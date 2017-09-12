DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ibanez", "instrument", 250.50, 100),("Gibson", "instrument", 1200, 100),("Fender", "instrument", 600, 100),("Taylor", "instrument", 900.75, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("strings", "gear", 7.50, 100),("tuner", "gear", 20, 100),("stand", "gear", 15.25, 100),("shoulder strap", "gear", 12, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("delay", "pedals", 50.50, 100),("fuzzbox", "pedals", 48, 100),("reverb", "pedals", 64, 100),("flange", "pedals", 55.75, 100);
