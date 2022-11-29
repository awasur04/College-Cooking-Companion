module.exports =
{
	BLUECARTAPI:{
		//API_KEY: "328AA0E0100A4EA9AF5F0642FA463AD7",
		//Kole's Key : "328AA0E0100A4EA9AF5F0642FA463AD7",
		ITEMS_ENDPOINT: '/items'
	},

	SPOONACULAR:
	{
		API_KEY: "",
		HOST: "api.spoonacular.com",
		RECIPES: '/recipes/',
		FIND_BY_INGREDIENTS: "findByIngredients",
		GET_INSTRUCTIONS_ENDPOINT: '/analyzedInstructions',
		NUTRITON_ENDPOINT: `/nutritionWidget.json`,
		ID_ENDPOINT: '/information',
		PDF_ENDPOINT: '/card',
	},

	TEST:
	{
		HOST: "localhost",
		PORT: 3000,
		RECIPES_ENDPOINT: '/recipes',
		INSTRUCTIONS_ENDPOINT: '/instructions',
		NUTRITION_ENDPOINT: '/nutrition',
		ID_ENDPOINT: '/id',
		PDF_ENDPOINT: '/pdf',
	},

}