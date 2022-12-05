/*
 * @name routes
 * @author Adam Rusaw, Alonso Montelongo
 * @version 1.0
 * @data 10/27/2022
 * @purpose Contains the endpoints the frontend needs to call in order to pass/retrive data to our controller file
 * 
 */


  const controller = require("../controllers/controller");

  var router = require("express").Router();

  // Calls the controller.create method to create a new user
  router.post("/create", controller.create);

  // Calls the controller.findAll method to retrive all users
  router.get("/all", controller.findAll);


  // Calls the controller.findId method to retrive the id of the user by email
  router.post("/userid", controller.findId);

  //Gets the user saved recipes
  router.get("/getsavedrecipes/id", controller.getSavedRecipes);


  //Calls the controller.findOne method to retive one user
  router.get("/getoneuser/id", controller.findOne);

  //Calls the controller.findOne method to Update on user
  router.put("/updateoneuser/id", controller.update);

  //Calls the controller.findOne method to Update on user
  router.put("/updateusersavedrecipes", controller.updateSavedRecipes);

  //Calls the controller.findOne method to Update on user
  router.put("/updateusersavedingredients", controller.updateSavedRIngredients);


  //Calls the controller.findOne method to delete one user
  router.delete("/deleteoneuser/id", controller.delete);

  // Calls the controller.verifyUser method to retrive a boolean in JSON to see if user exsit true if yes and false if user does not exsit
  router.post("/verifyUser", controller.verifyUser);






  // Find recipes by ingredients
  //Use Case: <host>/routes/recipes/ingredients
  //Body Text ingredients:eggs,flour,sugar,yeast
  router.post("/recipes/ingredients", controller.findRecipes);

  //Find recipe by id
  //Use Case: <host>/routes/recipes/id
  //Body Text id:639492
  router.post("/recipes/id", controller.findRecipeById);

  //Get PDF of recipe
  //Use Case: <host>/routes/recipes/pdf
  //Body Text id:639492
  router.get("/recipes/pdf", controller.getRecipePDF);

  router.get("/items", controller.findItems);

  module.exports = router;