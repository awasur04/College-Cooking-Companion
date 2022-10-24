//TO run the server.js you need to be in the directory for the backend folder
//Then run the command "npm install"
//Finally after it installs the dependencies you can run "node server.js" and the application will start

//After you have installed the dependencies once on your machine all you will need to use to start the server is node server.js


const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = require("./app/models");
const recipe_controller = require("./app/controllers/recipe_controller");
//db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let runType = process.argv.slice(2);

if (runType == "dev")
{
  require('child_process').fork('../testing/index.js');
  recipe_controller.setUp(runType);
  runServer();
}
else if (runType == "prod")
{
  recipe_controller.setUp(runType);
  runServer();
}
else
{
  console.log("\nPlease select a run type `dev`, `prod` -- Example run case `node server.js dev`");
}

function runServer()
{
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () =>
  { 
    console.log(`Server is running on port ${PORT}.`);

    let output = recipe_controller.findRecipes(ingredients = ["eggs", "salt", "milk", "butter", "yeast"], displayCheck);
  });
}

function displayCheck(output)
{
  console.log(output);
}
