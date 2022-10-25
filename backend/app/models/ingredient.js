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