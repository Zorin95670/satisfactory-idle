<template>
  <div class="item-crafter">
    <label>{{ recipe.name }} ({{maxCraftable()}})</label>
    <img :src="imageSrc" alt="recipe">
    <label>Ingredients</label>
    <ingredient
      v-for="ingredient in recipe.ingredients"
      v-bind:key="ingredient.name"
      :name="ingredient.name"
      :type="ingredient.type"
      :number="ingredient.number"/>
    <div>
      <button :disabled="!isCraftable() || active" @click="craft()">Craft</button>
      <button :disabled="!isCraftable() || active" @click="craft(maxCraftable())">
        Craft max({{maxCraftable()}})
      </button>
    </div>
    <loader :timer="recipe.craftingTime * multiplier" :active="active"/>
  </div>
</template>

<script>
import Recipe from '@/models/Recipe';
import Ingredient from '@/components/Ingredient.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'ItemCrafter',
  components: {
    Loader,
    Ingredient,
  },
  props: {
    recipe: Recipe,
  },
  data() {
    return {
      multiplier: 1,
      active: false,
      imageSrc: `${process.env.BASE_URL}images/${this.recipe.type}/${this.recipe.name}.png`,
    };
  },
  methods: {
    maxCraftable() {
      return Math.min(...this.recipe.ingredients
        .map(ingredient => parseInt(
          this.$store.state.resources[ingredient.type][ingredient.name].total / ingredient.number,
          10,
        )));
    },
    isCraftable() {
      return this.recipe.ingredients
        .every(ingredient => this.$store.state.resources[ingredient.type][ingredient.name].total
          >= ingredient.number);
    },
    craft(multiplier = 1) {
      this.multiplier = multiplier;
      this.active = true;
      this.recipe.ingredients.forEach((ingredient) => {
        this.$store.commit('decrement', {
          name: ingredient.name,
          type: ingredient.type,
          number: ingredient.number * multiplier,
        });
      });

      setTimeout(() => {
        this.multiplier = 1;
        this.active = false;
        this.$store.commit('increment', {
          name: this.recipe.name,
          type: this.recipe.type,
          number: this.recipe.number * multiplier,
        });
      }, this.recipe.craftingTime * multiplier);
    },
  },
};
</script>

<style lang="scss" scoped>
  .item-crafter {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.25rem solid grey;
    border-radius: 0.5rem;
    background-color: white;
    color: black;
    padding: 0.5rem;
    min-width: 10rem;
    margin-left: 0.75rem;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
