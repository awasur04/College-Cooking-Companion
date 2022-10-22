//TO run the server.js you need to be in the directory for the backend folder
//Then run the command "npm install"
//Finally after it installs the dependencies you can run "node server.js" and the application will start

//After you have installed the dependencies once on your machine all you will need to use to start the server is node server.js


const express = require("express");
const bodyParser = require("body-parser");
const routes =require('./app/routes/routes');

const app = express();
const db = require("./app/models");
//db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/routes', routes)


// simple route
app.get("/", (req, res) =>
{
  res.json({ message: "Welcome to college cooking companions application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
{
  console.log(`Server is running on port ${PORT}.`);
});
