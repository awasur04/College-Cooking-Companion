const db = require("../models");
const recipe_controller = require("../controllers/recipe_controller");
//const User = db.user;
//const Op = db.Sequelize.Op;
//const { defaultValueSchemable } = require("sequelize/types/utils");

const mysql = require("mysql");

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
    user.email =req.body.email;
    user.password =req.body.password;
    user.savedrecipes = "";

    if (user.fname == undefined || user.email == undefine || user.password == undefined)
    {
        console.log("Error undefined input");
        res.send("User information failed validation").status(400).end();
        return;
    }

    console.log(user);
   testdb.query("INSERT INTO users  (email,fname,password,savedrecipes) VALUES (?,?,?,?)",[user.email,user.fname,user.password,user.savedrecipes],(err, result) => {
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
    user.email =req.body.email;
    user.password =req.body.password;
    user.savedrecipes = req.body.savedrecipes;

    if (user.fname == undefined || user.email == undefine || user.password == undefined || user.id == undefined || user.savedrecipes == undefined)
    {
        console.log("Error undefined input");
        res.send("User information failed validation").status(400).end();
        return;
    }

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

<<<<<<< Updated upstream
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    console.log("Testdeleteall");
    res.status(200).end();
};
=======

// Retrieve all Uers from the database and send it to user as JSON
exports.getSavedRecipes = (req, res) => {
    const userID = req.body.id;
    testdb.query("SELECT * FROM savedRecipes WHERE userID = ?", [userID], (err,result) =>
    { 
        if (err)
        {
            console.log(err)
        }
        else
        {   let dbresult = result.toString().split(",");
            let recipeList = [];
            for (let i = 0; i < dbresult.length; i++)
            {
                recipe_controller.findRecipeById(dbresult[i], recipeList, (result) =>
                {
                    if (result == undefined)
                    {
                        console.log("\nUNABLE TO RETRIEVE SAVED RECIPES");
                        recipeList.push(result);
                    } else {
                        res.send(result).status(200).end();
                    }
                })
            }
            let returnArray = JSON.stringify(recipeList);
            res.send(returnArray).status(503).end();
        }
    })
};

>>>>>>> Stashed changes

//Sample body input
//ingredients = eggs,salt,milk,butter,yeast
exports.findRecipes = (req, res) =>
{
    let ingredients = req.body.ingredients;

    if (ingredients == undefined)
    {
        res.send("No ingredients specified").status(400).end();
        return;
    }

    recipe_controller.findRecipes(ingredients, (result) =>
    {
        if (result == undefined)
        {
            res.send("Unable to find recipes").status(503).end();
        } else {
            res.send(result).status(200).end();
        }
    })
    
};

//Sample body input
//id = 639492
exports.findRecipeById = (req, res) =>
{
    let recipeId = req.body.id;
    if (recipeId == undefined)
    {
        res.send("Unable to find recipe by id (Missing ID)").status(400).end();
        return;
    }
    recipe_controller.findRecipeById(recipeId, (result) =>
    {
        if (result == undefined)
        {
            console.log("\nUNABLE TO RETRIEVE RECIPE");
            res.send("Unable to find recipe by id").status(503).end();
        } else {
            res.send(result).status(200).end();
        }
    })
};

//Get Recipe PDF
//Sample input
//id = 639492
exports.getRecipePDF = (req, res) =>
{
    let recipeId = req.body.id;

    if (recipeId == undefined)
    {
        console.log("\nUNABLE TO RETRIEVE RECIPE");
        res.send("Unable to find recipe by id (Missing ID)").status(400).end();
        return;
    }

    recipe_controller.getRecipePDF(recipeId, (result) =>
    {
        if (result == undefined)
        {
            res.send("Unable to find recipe by id").status(503).end();
        } else {;
            res.send(result).status(200).end();
        }
    })
};