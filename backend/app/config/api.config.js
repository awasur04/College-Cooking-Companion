module.exports =
{
	BLUECARTAPI:{
		API_KEY: "",
		//Kole's Key : "520C69C4F08848A5984921A32856F81C",
		HOST: "api.spoonacular.com",

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