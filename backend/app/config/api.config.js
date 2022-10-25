module.exports =
{
	SPOONACULAR:
	{
		API_KEY: "",
		HOST: "api.spoonacular.com",
		FIND_BY_INGREDIENTS: "/recipes/findByIngredients",
		GET_INSTRUCTIONS_START: `/recipes/`,
		GET_INSTRUCTIONS_END: '/analyzedInstructions',
		NUTRITON_START: `/recipes/`,
		NUTRITON_END: `/nutritionWidget.json`,
		ID_START: '/recipes/',
		ID_END: '/information',
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