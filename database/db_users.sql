CREATE DATABASE db;
use db;

CREATE TABLE users(
    id int not null AUTO_INCREMENT,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
)