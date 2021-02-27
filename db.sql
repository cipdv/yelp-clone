-- -install postgres and setup psql 
--     \l shows all the databases on your postgres account
--     CREATE DATABASE databasename; to make a new database
--     -always end psql commands with ;
--     \c databasename to connect to a database
--     \d to see the tables we have
--     \d nameoftable to see the details of the table
    

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    location VARCHAR (50) NOT NULL,
    price_range INT NOT NULL check (price_range >= 1 and price_range <=5)
);

-- to create a new entry
INSERT INTO restaurants (name, location, price_range) values ('McDonalds', 'New York', 3);

-- -to generate automatic id use BIGSERIAL
-- need to have a primary key for each table by adding PRIMARY KEY
-- NOT NULL ensures the value can't be left blank
-- CHECK let's you set a range for values in a column

-- search queries
select * from restaurants;
select * from restaurants where id = 2;

-- to update an entry
update restaurants set name = "newname", location="newlocation", price_range="newpricerange" where id = 123;

-- make a table for review section and set a foreign key to relate it to the restaurants table with the restaurant id
create table reviews (
    id BIGSERIAL not null primary key,
    restaurant_id bigint not null references restaurants(id),
    name VARCHAR (50) not null,
    review text not null,
    rating int check (rating >= 1 and rating <=5) not null
);

insert into reviews (restaurant_id, name, review, rating) values (10, 'don', 'dfdsfa', 2);s
