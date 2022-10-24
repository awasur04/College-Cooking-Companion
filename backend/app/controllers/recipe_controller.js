const recipe = require("../models/recipe");
const config = require("../config/api.config");

//REPLACE WITH HTTPS
let https;
let apiOption;
let runMode;


exports.setUp = (runType) =>
{
	runMode = runType;
	if (runType == "dev")
	{
		https = require("http");
		apiOption = 
		{
			host: config.TEST.IP,
			port: config.TEST.PORT,
		}
	}
	else
	{
		https = require("https");
		apiOption =
		{
			host: config.SPOONACULAR.HOST
		};
	}
}

// Query the recipes. Pass in an array of ingredients
exports.findRecipes = (ingredients, cb) =>
{
	//Add + sign for all ingredients after the first
	for (i = 0; i < ingredients.length; i++)
	{
		if (i > 0)
		{
			ingredients[i] = "+" + ingredients[i];
		}
	}

	if (runMode == "dev")
	{
		apiOption.path = config.TEST.RECIPES_ENDPOINT;
	} else {
		apiOption.path = config.SPOONACULAR.RECIPES_ENDPOINT + `?ingredients=${ingredients}&number=5&apiKey=${config.SPOONACULAR.API_KEY}`;
	}

	

	https.get(apiOption, (response) =>
	{
		let responseData = "";

		response.on('data', (chunk) =>
		{
			responseData = responseData + chunk.toString();
		});

		response.on('end', () =>
		{
			//Format our data response chunk into json format
			const jsonData = JSON.parse(responseData);
			processRecipes(jsonData);
		});

	}).on('error', (e) => 
	{
		console.log("ERROR: Spoonacular API could not be reached.\nMessage: " + e.message);
		cb(undefined);
	})
};

function processRecipes(inputJSON)
{
	for (let i = 0; i < inputJSON.length; i++)
	{
		//id, title, image, ingredients, instructions, nutrition
		let currentId = inputJSON[i].id;
		let currentTitle = inputJSON[i].title;
		let currentImage = inputJSON[i].image;

		let currentIngredients = getIngredients(inputJSON[i].usedIngredients, inputJSON[i].missedIngredients)
		let currentInstructions = getInstructions()
		for (let j = 0; j < used.length; j++)
		{
			console.log(used[j].name);
		}
	}
}


function getIngredients(usedIngredients, missingIngredients)
{
	let ingredientList = [];

	for (let i = 0; i < usedIngredient.length; i++)
	{
		let ing = new Ingredient(usedIngredient[i].id, usedIngredient[i].name, usedIngredient[i].image, usedIngredient[i].amount + " " + usedIngredient[i].unit, true);
		ingredientList.push(ing);
	}

	for (let i = 0; i < missingIngredients.length; i++)
	{
		let ing = new Ingredient(missingIngredients[i].id, missingIngredients[i].name, missingIngredients[i].image, missingIngredients[i].amount + " " + missingIngredients[i].unit, false);
		ingredientList.push(ing);
	}

	return ingredientList;
}

function getInstructions()
{

}
