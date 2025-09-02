Create database ecommerce; -- Creating database using workbench IDE 

use ecommerce; -- Change the Db from default to Specific db , in my case db_created_via_Workbench

-- Create Customer Table 
-- here i have used auto increment for Id column and marked it as primary key to handle it as non nullable unique value,
-- name: i have used medium text so that i can insert upto 16 million charc, if i use nvarchar(some value) then it might impact in future for insert/Update
-- email: i have used varchar(1000) because most of the email provider has a restriction to have more char so 1000 char is more sufficient
-- address: i have used Long text so that i can insert upto 4 billion charc,
Create table Customers (id int auto_increment primary key, name mediumtext, email varchar(1000), address longtext);  

-- Inserting data into Customers table
Insert into Customers (name, email, address) values (N'RAGASWETHA', 'Ragaswetha07@gmail.com', N'HomeBush, Sydney, Australia');
Insert into Customers (name, email, address) values (N'SWETHA', 'Ragaswetha07@gmail.com', N'StrathField, Sydney, Australia'); 
Insert into Customers (name, email, address) values (N'TESTUSER', 'TEST@gmail.com', N'Sydney, Australia'); 

-- Retriving Record from Customer Tab
SELECT * FROM CUSTOMERS;


-- Create Orders Table 
-- here i have used auto increment for Id column and marked it as primary key to handle it as non nullable unique value

-- customer_id: i have used int which is the foriegn key relationship with customer table id column and 
-- used cascade on delete/Update to handle when id of customer is changed then update the order table 
-- and if customer is deleted then delete the order table as well

-- order: i have used medium text so that i can insert upto 16 million charc and also order is a keyword so placed the text under tilt symbol
-- order_date: i have used Date for saving order placed date
-- total_amount: i have used decimal with whole value of 10 digit and 2 decimal point;

Create TABLE Orders (id int auto_increment primary key,customer_id int, `order` mediumtext,order_date date, total_amount decimal(10,2),
    constraint fk_customer FOREIGN KEY (customer_id) REFERENCES Customers(id) on delete cascade on update cascade);

-- Inserting data into Orders table
-- Here i have used curdate to get the current date and
-- also i have explictly added 000 after decimal point but system will save with 00 instead of 000
Insert into Orders (customer_id,  `order`, order_date, total_amount) values (1, 'Iphone 16 Pro max', curdate(), 100000.000);
-- Here i have used DATE_sub func so that i can subtract 15 days from current date -15th day date.
Insert into Orders (customer_id,  `order`, order_date, total_amount) values (2, 'Macbook Pro', date_sub(curdate(), interval 15 day), 300000.10);
Insert into Orders (customer_id,  `order`, order_date, total_amount) values (2, 'PRODUCT C', date_sub(curdate(), interval 45 day), 10);
Insert into Orders (customer_id,  `order`, order_date, total_amount) values (3, 'PRODUCT C', date_sub(curdate(), interval 45 day), 10);
Insert into Orders (customer_id,  `order`, order_date, total_amount) values (1, 'PRODUCT A', date_sub(curdate(), interval 10 day), 10);

-- Retriving Record from Orders Tab
SELECT * FROM Orders;	


-- Create Products Table 
-- Id: here i have used auto increment for Id column and marked it as primary key to handle it as non nullable unique value
-- name: i have used medium text so that i can insert upto 16 million charc
-- price: i have used decimal with whole value of 10 digit and 2 decimal point;
-- description: i have used Long text so that i can insert upto 4 billion charc
Create TABLE Products (id int auto_increment primary key, name mediumtext, price decimal(10,2), description longtext);

-- Inserting data into Products table
Insert into Products (name,  price, description) values ('Iphone 16 Pro max', 100000.00, 'Newly Launched Max pro by Apple');
Insert into Products (name,  price, description) values ('Macbook Pro', 300000.10, 'Newly Launched Mac Laptop pro by Apple');
Insert into Products (name,  price, description) values ('PRODUCT C', 10, 'Product c');
Insert into Products (name,  price, description) values ('PRODUCT A', 10, 'Product c');
Insert into Products (name,  price, description) values ('PRODUCT B', 10, 'Product c');
-- Retriving Record from Products Tab
SELECT * FROM Products;	

-- Tasks
-- Retrieve all customers who have placed an order in the last 30 days.

-- here i used inner join between customer and order and
-- between clause as well as date_sub func to get current date -30 day's date which gets the last 30 days order
select c.name from customers c join orders o on c.id = o.customer_id 
where o.order_date between date_sub(curdate(), interval 30 day) and curdate();

-- Get the total amount of all orders placed by each customer.

-- here i used c.name for grouping customer's muliple orders and used aggregate func sum() to total the order price of each customer and 
-- used inner join between customer and order
select c.name as customer,  sum(o.total_amount) total from customers c join orders o on c.id = o.customer_id  group by c.name;

-- Update the price of Product C to 45.00.
-- here i retireved the Product c record ID
select * from Products  WHERE name = 'PRODUCT C'; 
-- Here i used the retrieved id to update the product in product table
Update Products p set price = 45 where p.id = 3;

-- Add a new column discount to the products table.
-- here i have used alter table query with add column and assigned default value 0.0 
Alter table Products Add column discount decimal(3,2) default 0.0;

-- Retrieve the top 3 products with the highest price.
-- here i used order by clause with descending order of price which brings data in sequence of max values to Least values and using limit to bring top 3 records
select name from products order by price desc limit 3;

-- Get the names of customers who have ordered Product A.
-- here i used inner join between order and customer and used lower for order column to avoid case sensitivity issue
select c.name from customers c join orders o on c.id = o.customer_id where lower(o.order) = 'product a';

-- Join the orders and customers tables to retrieve the customer's name and order date for each order
-- here i used inner join between order and customer
select c.name,o.order_date from customers c join orders o on c.id = o.customer_id; 

-- Retrieve the orders with a total amount greater than 150.00.
-- here i used simple greater than symbol to get the orders 
select * from orders o where  o.total_amount>150.00;

-- Normalize the database by creating a separate table for order items and updating the orders table to reference the order_items table.
-- Here i removed the order column because order item will hold the product details and order id
alter table orders drop column `order`;
-- Here i created the order item table with foriegn key for product and order with cascade delete for both the table
create table order_items (id int auto_increment primary key, order_id int not null, product_id int not null, 
    constraint fk_order foreign key (order_id) references orders(id) on delete cascade,
    constraint fk_product foreign key (product_id) references products(id) on delete cascade);
    
-- here i inserted the existing orders to order item table so the order item table act as a child tab for order parent table
Insert into order_items (order_id,  product_id) values (1, 1);
Insert into order_items (order_id,  product_id) values (2, 2);
Insert into order_items (order_id,  product_id) values (3, 3);
Insert into order_items (order_id,  product_id) values (4, 3);
Insert into order_items (order_id,  product_id) values (5, 5);


-- Retrieve the average total of all orders.
Select avg(total_amount) from orders



    
    



