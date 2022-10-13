const recipe = require("../models/recipe");
const config = require("../config/api.config");
const https = require("https");

// Query the recipes. Pass in an array of ingredients
exports.find = (ingredients, res) =>
{
	//Add + sign for all ingredients after the first
	for (i = 0; i < ingredients.length; i++)
	{
		if (i > 0)
		{
			ingredients[i] = "+" + ingredients[i];
		}
	}

	const options =
	{
		host: config.SPOONACULAR.HOST,
		path: `/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${config.SPOONACULAR.API_KEY}`,
	}

	https.get(options, (response) =>
	{
		//Do something with data returned
	})
};
