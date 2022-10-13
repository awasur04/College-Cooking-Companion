
//Sample API which will return the recipes that we are using for our test demo
//To use simply open the cmd window in this directory and type
// "node index.js"
//The api can then send the request to an HTTP get reqquest at localhost:3000


const express = require('express');
const recipes = require('./recipes.json');

const app = express();
const port = 3000;

app.get('/', (req, res) =>
{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(recipes));
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));