import recipes from '@/assets/recipes.json';

class Recipe {
  constructor(name, type = 'item') {
    const recipe = recipes[name];

    this.name = name;
    this.type = type;
    this.craftingTime = recipe.craftingTime;
    this.ingredients = recipe.ingredients;
    this.number = recipe.number;
  }
}

export default Recipe;
