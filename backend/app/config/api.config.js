module.exports =
{
	SPOONACULAR:
	{
		API_KEY: "",
		HOST: "api.spoonacular.com",
		FIND_BY_INGREDIENTS: "api.spoonacular.com/recipes/findByIngredients",
		//GET_INSTRUCTIONS: `https://api.spoonacular.com/recipes/${id}/findByIngredients`,
		//GET_PDF: `https://api.spoonacular.com/recipes/${id}/card`,
		//NUTRITON: `https://api.spoonacular.com/food/menuItems/${id}/nutritionWidget.png`,
	},

	TEST:
	{
		HOST: "localhost",
		PORT: 3000,
		RECIPES_ENDPOINT: '/recipes',
		INSTRUCTIONS_ENDPOINT: '/instructions',
	},

}