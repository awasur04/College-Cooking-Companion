/*
 * @name ingredient
 * @autor Adam Rusaw
 * @version 1.0
 * @data 10/27/2022
 * @purpose Creates the model for the ingredients
 * 
 */
module.exports = class Ingredient
{
	constructor(id, name, image, amount, currentlyOwned)
	{
		this.id = id;
		this.name = name;
		this.image = image;
		this.amount = amount;
		this.currentlyOwned = currentlyOwned;
	}

}