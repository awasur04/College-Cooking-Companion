
//Sample API which will return the recipes that we are using for our test demo
//To use simply open the cmd window in this directory and type
// "node index.js"
//The api can then send the request to an HTTP get reqquest at localhost:3000


const express = require('express');
const recipes = require('./recipes.json');
const instructions = require('./instructions.json');
const nutrition = require('./nutrition.json');
const id = require('./recipeID.json');
const pdf = require('./widget.json');

const app = express();
const port = 3000;



app.get('/recipes', (req, res) =>
{
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(recipes));
});

app.get('/instructions', (req, res) =>
{
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(instructions));
});

app.get('/nutrition', (req, res) =>
{
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(nutrition));
});

app.get('/id', (req, res) =>
{
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(id));
});

app.get('/pdf', (req, res) =>
{
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(pdf));
});

app.listen(port, () => console.log(`Testing API listening on port ${port}!`));