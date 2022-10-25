module.exports =
{
	SPOONACULAR:
	{
		API_KEY: "",
		HOST: "api.spoonacular.com",
		RECIPES: '/recipes/',
		FIND_BY_INGREDIENTS: "findByIngredients",
		GET_INSTRUCTIONS_ENDPOINT: '/analyzedInstructions',
		NUTRITON_ENDPOINT: `/nutritionWidget.json`,
		ID_ENDPOINT: '/information',
	},

	TEST:
	{
		HOST: "localhost",
		PORT: 3000,
		RECIPES_ENDPOINT: '/recipes',
		INSTRUCTIONS_ENDPOINT: '/instructions',
		NUTRITION_ENDPOINT: '/nutrition',
		ID_ENDPOINT: '/id',
	},

}