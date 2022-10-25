const recipe = require("../models/recipe");
const config = require("../config/api.config");

//REPLACE WITH HTTPS


exports.findRecipeById = (recipeId, cb) =>
{
	let testOptions =
	{
		host: config.TEST.HOST,
		port: config.TEST.PORT,
		path: config.TEST.RECIPES_ENDPOINT,
	};

	let options =
	{
		host: config.SPOONACULAR.HOST,
		path: config.SPOONACULAR.FIND_BY_INGREDIENTS + `?ingredients=${ingredients}&number=5&apiKey=${config.SPOONACULAR.API_KEY}`,
	};


	https.get(options, (response) =>
	{
		let responseData = "";

		response.on('data', (chunk) =>
		{
			responseData = responseData + chunk.toString();
		});
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
		let currentInstructions = await getInstructions(currentId);
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

function getInstructions(recipeId)
{
	return new Promise(function (resolve, reject)
	{
		let recipeInstructions = [];

		let testOptions =
		{
			host: config.TEST.HOST,
			port: config.TEST.PORT,
			path: config.TEST.INSTRUCTIONS_ENDPOINT,
		};

		let options =
		{
			host: config.SPOONACULAR.HOST,
			path: config.SPOONACULAR.GET_INSTRUCTIONS_START + recipeId + config.SPOONACULAR.GET_INSTRUCTIONS_END + `?apiKey=${config.SPOONACULAR.API_KEY}`,
		};

		let request = https.get(options, (response) =>
		{

			if (response.statucCode < 200 || response >= 300)
			{
				return reject(new Error('statusCode=' + resolve.statucCode));
			}

			let responseData = "";

			response.on('data', (chunk) =>
			{
				responseData = responseData + chunk.toString();
			});

			response.on('end', () =>
			{
				//Format our data response chunk into json format
				const jsonData = JSON.parse(responseData);

				for (let j = 0; j < jsonData[0].steps.length; j++)
				{
					recipeInstructions[j] = jsonData[0].steps[j].step;
				}
				resolve(recipeInstructions);
			});
		});

		request.on('error', (err) =>
		{
			reject(err);
		});

		request.end();
	});
}


function getNutrition(recipeId)
{
	return new Promise(function (resolve, reject)
	{
		let recipeNutrition = {};

		let testOptions =
		{
			host: config.TEST.HOST,
			port: config.TEST.PORT,
			path: config.TEST.NUTRITION_ENDPOINT,
		};

		let options =
		{
			host: config.SPOONACULAR.HOST,
			path: config.SPOONACULAR.NUTRITON_START + recipeId + config.SPOONACULAR.NUTRITON_END + `?apiKey=${config.SPOONACULAR.API_KEY}`,
		};

		let request = https.get(options, (response) =>
		{
			if (response.statucCode < 200 || response >= 300)
			{
				return reject(new Error('statusCode=' + resolve.statucCode));
			}

			let responseData = "";

			response.on('data', (chunk) =>
			{
				responseData = responseData + chunk.toString();
			});

			response.on('end', () =>
			{
				//Format our data response chunk into json format
				const jsonData = JSON.parse(responseData);

				for (let i = 0; i < jsonData.bad.length; i++)
				{
					let title = jsonData.bad[i].title.replace(/ /g, "_");
					recipeNutrition[title] = { Amount: jsonData.bad[i].amount, Percent_Of_Daily_Needs: jsonData.bad[i].percentOfDailyNeeds };
				}

				for (let i = 0; i < jsonData.good.length; i++)
				{
					let title = jsonData.good[i].title.replace(/ /g, "_");
					recipeNutrition[title] = { Amount: jsonData.good[i].amount, Percent_Of_Daily_Needs: jsonData.good[i].percentOfDailyNeeds };
				}
				resolve(recipeNutrition);
			});

		});

		request.on('error', (err) =>
		{
			reject(err);
		});

		request.end();
	});
}
