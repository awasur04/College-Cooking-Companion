/*
 * @name recipe
 * @author Adam Rusaw
 * @version 1.0
 * @data 10/27/2022
 * @purpose Creates the model for the recipes
 * 
 */
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