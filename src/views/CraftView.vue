<template>
  <div class="craft-view">
    <item-crafter v-for="recipe in recipes" v-bind:key="recipe.name" :recipe="recipe"/>
  </div>
</template>

<script>
import ItemCrafter from '@/components/ItemCrafter.vue';

export default {
  name: 'CraftView',
  components: { ItemCrafter },
  data() {
    const recipes = [];

    Object.keys(this.$store.state.recipes.item)
      .filter(name => this.$store.state.recipes.item[name].unlock)
      .forEach((key) => {
        recipes.push(this.$store.state.recipes.item[key]);
      });

    return {
      recipes,
    };
  },
};
</script>

<style lang="scss" scoped>
  .craft-view {
    margin-top: 1rem;
  }
</style>
