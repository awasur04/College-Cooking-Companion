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
<<<<<<< HEAD
    user.name =req.body.name;
    user.email =req.body.email;
    user.password=req.body.password;
    user.savedrecipes = "";
    user.ingredients ="";
    user.password =bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

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
   testdb.query("INSERT INTO users  (email,name,password,savedrecipes,ingredients) VALUES (?,?,?,?,?)",[user.email,user.name,user.password,user.savedrecipes,user.ingredients],(err, result) => {
=======
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
>>>>>>> 3c3fa7ed73d414c88e5bb65cafc23d1858177db5
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
<<<<<<< HEAD
    user.name =req.body.name;
=======
>>>>>>> 3c3fa7ed73d414c88e5bb65cafc23d1858177db5
    user.email =req.body.email;
    user.password =req.body.password;
    user.savedrecipes = req.body.savedrecipes;

<<<<<<< HEAD





    testdb.query("UPDATE users  SET name=?,email=?,password=?,savedrecipes=? WHERE id =?;",[user.name,user.email,user.password,user.savedrecipes,user.id],(err,result) =>{ 
=======
    if (user.fname == undefined || user.email == undefine || user.password == undefined || user.id == undefined || user.savedrecipes == undefined)
    {
        console.log("Error undefined input");
        res.send("User information failed validation").status(400).end();
        return;
    }

    testdb.query("UPDATE users  SET fname=?,lname=?,email=?,password=?,savedrecipes=? WHERE id =?;",[user.fname,user.lname,user.email,user.password,user.savedrecipes,user.id],(err,result) =>{ 
>>>>>>> 3c3fa7ed73d414c88e5bb65cafc23d1858177db5
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


// Find a single User with an id and updates savedrrecipes
exports.updateSavedRIngredients= (req, res) => {
    let user = new Object();
    user.id =req.body.id;
    user.ingredients = req.body.ingredients;






    testdb.query("UPDATE users  SET ingredients=? WHERE id =?;",[user.ingredients,user.id],(err,result) =>{ 
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

<<<<<<< HEAD
exports.verifyUser =(req,res) => {
    let user = new Object();
    user.email = req.body.email;
    user.password =req.body.password;
    
    //user.password =bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    console.log("User login info:\n", user);
    let flag = new Object();
    flag.verification = "TRUE";
    testdb.query("SELECT password FROM  users WHERE email=?",[user.email],(err,result) =>{
        if(err)
        {
            console.log(err)
            flag.verification ="FALSE";
            let awnser =JSON.stringify(flag);
            res.send(awnser).status(200).end();
        }
        else
        {
            let testresult = JSON.stringify(result)
            let hash =""
            for(let i =14;i<testresult.length-3;i++)
            {   hash= hash+testresult[i]

            }
            
            const compareResult =bcrypt.compareSync(user.password,hash,)
            console.log("compare result ",compareResult)
            flag.verification =compareResult

            res.send(flag).status(200).end();
            
        }
    }
    )



=======
<<<<<<< Updated upstream
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    console.log("Testdeleteall");
    res.status(200).end();
>>>>>>> 3c3fa7ed73d414c88e5bb65cafc23d1858177db5
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