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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
{
  console.log(`Server is running on port ${PORT}.`);

  let output = recipe_controller.findRecipes(ingredients = ["eggs", "salt", "milk", "butter", "yeast"], displayCheck);
});


function displayCheck(output)
{
  console.log(output);
}

