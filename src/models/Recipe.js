class Recipe {
  constructor(name, recipe) {
    this.name = name;
    this.type = recipe.type;
    this.unlock = recipe.unlock;
    this.craftingTime = recipe.craftingTime;
    this.ingredients = recipe.ingredients;
    this.number = recipe.number;
  }
}

export default Recipe;
