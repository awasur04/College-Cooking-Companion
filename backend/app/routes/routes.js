


  const controller = require("../controllers/controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", controller.create);

  // Retrieve all Tutorials
  router.get("/all", controller.findAll);

<<<<<<< Updated upstream
=======
  // Calls the controller.findId method to retrive the id of the user by email
  router.get("/userid", controller.findId);

  //Gets the user saved recipes
  router.get("/getsavedrecipes/id", controller.getSavedRecipes);
>>>>>>> Stashed changes

  // Retrieve a single Tutorial with id
  router.get("/getoneuser/id", controller.findOne);

  // Update a Tutorial with id
  router.put("/updateoneuser/id", controller.update);

  // Delete a Tutorial with id
  router.delete("/deleteoneuser/id", controller.delete);

  // Delete all Tutorials
  router.delete("/kamikaze", controller.deleteAll);

  // Find recipes by ingredients
  //Use Case: <host>/routes/recipes/ingredients
  //Body Text ingredients:eggs,flour,sugar,yeast
  router.get("/recipes/ingredients", controller.findRecipes);

  //Find recipe by id
  //Use Case: <host>/routes/recipes/id
  //Body Text id:639492
  router.get("/recipes/id", controller.findRecipeById);

  //Get PDF of recipe
  //Use Case: <host>/routes/recipes/pdf
  //Body Text id:639492
  router.get("/recipes/pdf", controller.getRecipePDF);

  module.exports = router;