/*
 * @name recipe
 * @author Alonso Montelongo, Adam Rusaw, David Arciniegas
 * @version 1.0
 * @data 10/27/2022
 * @purpose Creates the model for the recipes
 * 
 */
const recipe_controller = require("../controllers/recipe_controller");
const mysql = require("mysql");
const bcrypt = require ('bcrypt');
const testdb =mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    port:3306,
    database: "ccc",
})

// Create and Save a new User into a local database
exports.create = (req, res) => {
    let user = new Object();
    user.name =req.body.name;
    user.email =req.body.email;
    user.password="";
    user.savedrecipes = "";
    user.password =bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(req.body.password, salt, function(err, hash) {
    //     user.password = hash;
    //     //console.log(hash);
    //     });
    // });
    // if (user.password == "")
    // {
    //     user.password =req.body.password
    // }
    console.log(user);
   testdb.query("INSERT INTO users  (email,name,password,savedrecipes) VALUES (?,?,?,?)",[user.email,user.name,user.password,user.savedrecipes],(err, result) => {
    if (err){
        console.log(err);
    }else{    
                
        console.log("Success");
    }
    }
    );
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

// Find a single User with an id and updates all feilds
exports.update = (req, res) => {
    let user = new Object();
    user.id =req.body.id;
    user.name =req.body.name;
    user.email =req.body.email;
    user.password =req.body.password;
    user.savedrecipes = req.body.savedrecipes;






    testdb.query("UPDATE users  SET name=?,email=?,password=?,savedrecipes=? WHERE id =?;",[user.name,user.email,user.password,user.savedrecipes,user.id],(err,result) =>{ 
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

// Find a single User with an id and updates savedrrecipes
exports.updateSavedRecipes= (req, res) => {
    let user = new Object();
    user.id =req.body.id;
    user.savedrecipes = req.body.savedrecipes;






    testdb.query("UPDATE users  SET savedrecipes=? WHERE id =?;",[user.savedrecipes,user.id],(err,result) =>{ 
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

// Get a User by email to retrive id
exports.findId = (req, res) => {
    const email =req.body.email;
    testdb.query("SELECT id FROM users WHERE email=?",[email],(err,result) =>{ 
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
    const usertodelete =req.body.id;
    testdb.query("DELETE FROM users WHERE id=?",[req.body.id],(err,result)=>{ if (err){console.log(err)}else{console.log("Succes")}});
    res.status(200).end();
};





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
