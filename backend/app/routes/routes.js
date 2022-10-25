


  const user = require("../controllers/controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", user.create);

  // Retrieve all Tutorials
  router.get("/all", user.findAll);


  // Retrieve a single Tutorial with id
  router.get("/getoneuser/id", user.findOne);

  // Update a Tutorial with id
  router.put("/updateoneuser/id", user.update);

  // Delete a Tutorial with id
  router.delete("/deleteoneuser/id", user.delete);

  // Delete all Tutorials
  router.delete("/kamikaze", user.deleteAll);

  module.exports = router;