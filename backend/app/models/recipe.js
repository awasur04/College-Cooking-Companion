module.exports = class Recipe
{
	constructor(id, title, image, oIngredients, mIngredient, instructions, nutrition)
	{
		this.id = id;
		this.title = title;
		this.image = image;
		this.ownedIngredients = oIngredients;
		this.missingIngredients = mIngredient;
		this.instructions = instructions;
		this.nutrition = nutrition;
	}

	getIngredientList()
	{
		return this.ownedIngredients.concat(this.missingIngredients);
	}

}