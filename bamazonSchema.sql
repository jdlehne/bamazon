DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ibanez", "Guitars", 250.50, 8),("Gibson", "Guitars", 1200, 10),("Fender", "Guitars", 600, 3),("Taylor", "Guitars", 900.75, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Strings", "gear", 7.50, 100),("Chromatic Tuner", "gear", 20, 20),("Guitar stand", "gear", 15.25, 10),("Shoulder Strap", "gear", 12, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Delay", "pedals", 50.50, 4),("Fuzzbox", "pedals", 48, 10),("Reverb", "pedals", 64, 5),("Flanger", "pedals", 55.75, 10);


CREATE TABLE departments (
  department_id  INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs INT default 0,
  PRIMARY KEY (department_id)
);

SELECT * FROM departments d LEFT JOIN products p ON d.department_id = p.id
