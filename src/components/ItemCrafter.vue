<template>
  <div class="item-crafter">
    <label>{{ recipe.name }}</label>
    <img :src="imageSrc" alt="recipe">
    <label>Ingredients</label>
    <ingredient
      v-for="ingredient in recipe.ingredients"
      v-bind:key="ingredient.name"
      :name="ingredient.name"
      :type="ingredient.type"
      :number="ingredient.number"/>
    <button :disabled="!isCraftable() || active" @click="craft">Craft</button>
    <loader :timer="recipe.craftingTime" :active="active"/>
  </div>
</template>

<script>
import Recipe from '@/models/Recipe';
import Ingredient from '@/components/Ingredient.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'ItemCrafter',
  components: { Loader, Ingredient },
  props: {
    recipe: Recipe,
  },
  data() {
    return {
      active: false,
      imageSrc: `${process.env.BASE_URL}images/${this.recipe.type}/${this.recipe.name}.png`,
    };
  },
  methods: {
    isCraftable() {
      return this.recipe.ingredients
        .every(ingredient => this.$store.state.resources[ingredient.type][ingredient.name].total
          >= ingredient.number);
    },
    craft() {
      this.active = true;
      this.recipe.ingredients.forEach((ingredient) => {
        this.$store.commit('decrement', ingredient);
      });
      setTimeout(() => {
        this.active = false;
        this.$store.commit('increment', this.recipe);
      }, this.recipe.craftingTime);
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
    border: 1px solid black;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
