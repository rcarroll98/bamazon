DROP DATABASE IF EXISTS bamazon.sql;
CREATE DATABASE bamazon.sql;


CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

ALTER TABLE products ADD COLUMN product_name VARCHAR(60);

ALTER TABLE products ADD COLUMN department_name VARCHAR(60);

ALTER TABLE products ADD COLUMN price VARCHAR(60);

ALTER TABLE products ADD COLUMN stock_quantity VARCHAR(60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Monitor', 'Electronics', '200', '100'),
('Backpack', 'fashion', '50', '100'),
('Coffee Maker', 'Appliances', '50', '50'),
('Socks', 'Clothing', '20', '20'),
('Dish Set', 'Household', '20', '20'),
('TV', 'Electronics', '200', '20'),
('Soap', 'Household Supplies','10', '10'),
('Beekeeping Helmet', 'Beekeeping Supplies','200', '20'),
('Mineral Water', 'Water', '20', '200'),
('Tennis racket', 'Sporting Goods', '40', '20');
