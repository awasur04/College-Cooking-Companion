--This will create and use the DB if it doesn't exist
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

--This is the table for our user data, with UID being the primary key
CREATE TABLE IF NOT EXISTS Users(
    userID int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userID)
);

--The userID will auto increment by 1 when a new user is inserted like below
ALTER TABLE Users AUTO_INCREMENT = 1;
--You must specify the name and password columns for the autoincrement to work
INSERT INTO Users (name, password) VALUES ('testUser', 'password');

--This table stores the users saved recipes by recipeID
CREATE TABLE IF NOT EXISTS savedRecipes(
    userID int NOT NULL,
    recipeID int NOT NULL,
    PRIMARY KEY (userID)
);

--This table stores the shared recipes by recipeID, using the UID of the to and from 
--This table, and all the following, are for storing API queries to reduce the overhead on API calls
CREATE TABLE IF NOT EXISTS sharedRecipes(
    fromUserID int NOT NULL,
    toUserID int NOT NULL,
    recipeID int NOT NULL,
    PRIMARY KEY (fromUserID)
);

--This table, and all the following, are for storing API queries to reduce the overhead on API calls
CREATE TABLE IF NOT EXISTS recipes(
    recipeID int NOT NULL,
    recipeName VARCHAR(255) NOT NULL,
    recipeURL VARCHAR(255) NOT NULL,
    PRIMARY KEY (recipeID)
);

CREATE TABLE IF NOT EXISTS recipeNutrition(
    recipeID int NOT NULL,
    gCarb int NOT NULL,
    gFat int NOT NULL,
    gProtein int NOT NULL,
    PRIMARY KEY (recipeID)
);