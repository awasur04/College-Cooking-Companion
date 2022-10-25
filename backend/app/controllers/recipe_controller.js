
const Recipe = require("../models/recipe");
const config = require("../config/api.config");
const Ingredient = require("../models/ingredient");
let https = require("https");


//#region EXPORTS

//Retrieve a URL which points to a recipe widget PDF
exports.getRecipePDF = (recipeId, cb) =>
{
	let testOptions =
	{
		host: config.TEST.HOST,
		port: config.TEST.PORT,
		path: config.TEST.PDF_ENDPOINT,
	};

	let options =
	{
		host: config.SPOONACULAR.HOST,
		path: config.SPOONACULAR.RECIPES + recipeId + config.SPOONACULAR.PDF_ENDPOINT + `?&apiKey=${config.SPOONACULAR.API_KEY}`,
	};


	https.get(options, (response) =>
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
			let recipePDF = jsonData.url;
			cb(recipePDF);
		});

	}).on('error', (e) => 
	{
		console.log("ERROR: Spoonacular API could not be reached.\nMessage: " + e.message);
		cb(undefined);
	})
}

//Search for a recipe when given the id
exports.findRecipeById = (recipeId, cb) =>
{
	let testOptions =
	{
		host: config.TEST.HOST,
		port: config.TEST.PORT,
		path: config.TEST.ID_ENDPOINT,
	};

	let options =
	{
		host: config.SPOONACULAR.HOST,
		path: config.SPOONACULAR.RECIPES + recipeId + config.SPOONACULAR.ID_ENDPOINT + `?&apiKey=${config.SPOONACULAR.API_KEY}`,
	};


	https.get(options, (response) =>
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
			let foundRecipe = Promise.resolve(processRecipeById(jsonData));
			foundRecipe.then((recipe) =>
			{
				cb(recipe);
			})
		});

	}).on('error', (e) => 
	{
		console.log("ERROR: Spoonacular API could not be reached.\nMessage: " + e.message);
		cb(undefined);
	})
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

	let testOptions =
	{
		host: config.TEST.HOST,
		port: config.TEST.PORT,
		path: config.TEST.RECIPES_ENDPOINT,
	};

	let options =
	{
		host: config.SPOONACULAR.HOST,
		path: config.SPOONACULAR.RECIPES + config.SPOONACULAR.FIND_BY_INGREDIENTS + `?ingredients=${ingredients}&number=5&apiKey=${config.SPOONACULAR.API_KEY}`,
	};


	https.get(options, (response) =>
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
			let recipeList = Promise.resolve(processRecipes(jsonData));
			recipeList.then((recipes) =>
			{
				cb(recipes);
			})
		});

	}).on('error', (e) => 
	{
		console.log("ERROR: Spoonacular API could not be reached.\nMessage: " + e.message);
		cb(undefined);
	})
};

//#endregion

//#region PARSE JSON DATA
async function processRecipes(inputJSON)
{
	let recipeList = [];
	for (let i = 0; i < inputJSON.length; i++)
	{
		//id, title, image, ingredients, instructions, nutrition
		let currentId = inputJSON[i].id;
		let currentTitle = inputJSON[i].title;
		let currentImage = inputJSON[i].image;

		let currentIngredients = getIngredients(inputJSON[i].usedIngredients, inputJSON[i].missedIngredients);

		let currentNutrition = await getNutrition(currentId);
		let currentInstructions = await getInstructions(currentId);

		let recipe = new Recipe(currentId, currentTitle, currentImage, currentIngredients[0], currentIngredients[1], currentInstructions, currentNutrition);
		recipeList.push(recipe);
	}
	return recipeList;
}

async function processRecipeById(inputJSON)
{
	let emptyArray = [];

	let currentId = inputJSON.id;
	let currentTitle = inputJSON.title;
	let currentImage = inputJSON.image;
	let currentIngredients = getIngredients(inputJSON.extendedIngredients, emptyArray);
	let currentNutrition = await getNutrition(currentId);
	let currentInstructions = await getInstructions(currentId);
	let recipe = new Recipe(currentId, currentTitle, currentImage, currentIngredients[0], currentIngredients[1], currentInstructions, currentNutrition);
	return recipe;
}


function getIngredients(usedIngredients, missingIngredients)
{
	let ownedIngredientList = [];
	let missingIngredientList = [];

	for (let i = 0; i < usedIngredients.length; i++)
	{
		let ing = new Ingredient(usedIngredients[i].id, usedIngredients[i].name, usedIngredients[i].image, usedIngredients[i].amount + " " + usedIngredients[i].unit, true);
		ownedIngredientList.push(ing);
	}

	for (let i = 0; i < missingIngredients.length; i++)
	{
		let ing = new Ingredient(missingIngredients[i].id, missingIngredients[i].name, missingIngredients[i].image, missingIngredients[i].amount + " " + missingIngredients[i].unit, false);
		missingIngredientList.push(ing);
	}

	return [ownedIngredientList, missingIngredientList];
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
			path: config.SPOONACULAR.RECIPES + recipeId + config.SPOONACULAR.GET_INSTRUCTIONS_ENDPOINT + `?apiKey=${config.SPOONACULAR.API_KEY}`,
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
			path: config.SPOONACULAR.RECIPES + recipeId + config.SPOONACULAR.NUTRITON_ENDPOINT + `?apiKey=${config.SPOONACULAR.API_KEY}`,
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
//#endregion
