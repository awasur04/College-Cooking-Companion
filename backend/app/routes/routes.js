


  const controller = require("../controllers/controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", controller.create);

  // Retrieve all Tutorials
  router.get("/all", controller.findAll);


  // Retrieve a single Tutorial with id
  router.get("/getoneuser/id", controller.findOne);

  // Update a Tutorial with id
  router.put("/updateoneuser/id", controller.update);

  // Delete a Tutorial with id
  router.delete("/deleteoneuser/id", controller.delete);

  // Delete all Tutorials
  router.delete("/kamikaze", controller.deleteAll);

  // Find recipes by ingredients
  router.get("/recipes/ingredients", controller.findRecipes);

  //Find recipe by id
  router.get("/recipes/id", controller.findRecipeById);

  //Get PDF of recipe
  router.get("/recipes/pdf", controller.getRecipePDF);

  module.exports = router;