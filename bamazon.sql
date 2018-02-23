DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Radioactive Elements Glowing Coasters", "Kitchen Accessories", 12.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BB-8 Desktop Lamp", "Home Lighting", 29.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tactical Holiday Stocking", "Home Decor", 5.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lego Mug", "Kitchen Accessories", 3.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lightsaber Immersion Blender", "Kitchen Appliances", 29.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BB-8 Heat Change Mug", "Kitchen Accessories", 7.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("R2D2 Measuring Cup Set", "Kitchen Accessories", 19.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gryffindor Knit Scarf", "Clothing", 29.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pi Infinity Scarf", "Clothing", 15.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pi Heat Change Mug", "Kitchen Accessories", 12.99, 22);

SELECT * FROM products;