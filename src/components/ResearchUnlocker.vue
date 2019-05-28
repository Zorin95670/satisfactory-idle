<template>
  <div class="research-unlocker">
    <label>{{ name }}</label>
    <label v-if="research.done">All ready unlock!</label>
    <div class="undone" v-else>
      <label>Ingredients</label>
      <ingredient
        v-for="ingredient in research.ingredients"
        v-bind:key="ingredient.name"
        :name="ingredient.name"
        :type="ingredient.type"
        :number="ingredient.number"/>
      <button :disabled="!isUnlockable() || active" @click="unlock">Unlock</button>
      <loader :timer="research.craftingTime" :active="active"/>
    </div>
  </div>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'ResearchUnlocker',
  components: { Loader, Ingredient },
  props: {
    name: String,
    research: Object,
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    isUnlockable() {
      return this.research.ingredients
        .every(ingredient => this.$store.state.resources[ingredient.type][ingredient.name].total
          >= ingredient.number);
    },
    unlock() {
      this.active = true;
      this.research.ingredients.forEach((ingredient) => {
        this.$store.commit('decrement', ingredient);
      });
      setTimeout(() => {
        this.active = false;
        this.$store.commit('unlock', this.research);
        this.$emit('unlock');
      }, this.research.craftingTime);
    },
  },
};
</script>

<style lang="scss" scoped>
  .research-unlocker {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.25rem solid grey;
    border-radius: 0.5rem;
    background-color: white;
    color:black;
    padding: 0.5rem;
    min-width: 10rem;
    margin-left: 0.75rem;

    .undone {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
