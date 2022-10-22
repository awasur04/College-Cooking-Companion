const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

//ALL NEEDS FUNCTIONALITY

// Create and Save a new User
exports.create = (req, res) => {
    console.log("Testcreate");
    res.status(200).end();
};

// Retrieve all Uers from the database.
exports.findAll = (req, res) => {
    console.log("TestfindAll");
    res.status(200).end();
};

// Find a single User with an id
exports.findOne = (req, res) => {
    console.log("Testfindone");
    res.status(200).end();
};

// Update a User by the id in the request
exports.update = (req, res) => {
    console.log("Testupdate");
    res.status(200).end();
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    console.log("Testdelete");
    res.status(200).end();
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    console.log("Testdeleteall");
    res.status(200).end();
};
