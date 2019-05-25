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

    Object.keys(this.$store.state.recipes)
      .forEach((key) => {
        recipes.push(this.$store.state.recipes[key]);
      });

    return {
      recipes,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
