const db = require("../models");
//const User = db.user;
//const Op = db.Sequelize.Op;
//const { defaultValueSchemable } = require("sequelize/types/utils");

const mysql =require("mysql");

const testdb =mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    port:3306,
    database: "ccc",
})


//ALL NEEDS FUNCTIONALITY

// Create and Save a new User into a local database
exports.create = (req, res) => {
    let user = new Object();
    user.fname =req.body.fname;
    user.id =req.body.id;
    user.lname =req.body.lname;
    user.email =req.body.email;
    user.password =req.body.password;
    user.savedrecipes = req.body.savedrecipes;
    console.log(user);
   testdb.query("INSERT INTO users  (email,fname,lname,password,savedrecipes) VALUES (?,?,?,?,?)",[user.email,user.fname,user.lname,user.password,user.savedrecipes],(err, result) => {
    if (err){
        console.log(err);
    }else{    
                
        console.log("Success");
    }
    }
    );
   testdb.end();
    let jsonUser =JSON.stringify(user);
    
    res.send(jsonUser).status(200).end();
    };

// Retrieve all Uers from the database and send it to user as JSON
exports.findAll = (req, res) => {
    
    testdb.query("SELECT * FROM users",(err,result) =>{ 
        if (err)
        {
            console.log(err)
        }
        else
        {   let dbresult = JSON.stringify(result);
            res.send(dbresult).status(200).end();
             console.log("Success");
            }})



    

};

// Find a single User with an id
exports.update = (req, res) => {
    let user = new Object();
    user.fname =req.body.fname;
    user.id =req.body.id;
    user.lname =req.body.lname;
    user.email =req.body.email;
    user.password =req.body.password;
    user.savedrecipes = req.body.savedrecipes;
    testdb.query("UPDATE users  SET fname=?,lname=?,email=?,password=?,savedrecipes=? WHERE id =?;",[user.fname,user.lname,user.email,user.password,user.savedrecipes,user.id],(err,result) =>{ 
        if (err)
        {
            console.log(err)
        }
        else
        {   console.log("Success");
            let dbresult = JSON.stringify(result);
            res.send(dbresult).status(200).end();
             
            }})
};

// Update a User by the id in the request
exports.findOne = (req, res) => {
    const id =req.body.id;
    testdb.query("SELECT * FROM users WHERE id=?",[id],(err,result) =>{ 
        if (err)
        {
            console.log(err)
        }
        else
        {   console.log("Success");
            let dbresult = JSON.stringify(result);
            res.send(dbresult).status(200).end();
             
            }})
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
