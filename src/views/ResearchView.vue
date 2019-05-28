<template>
  <div class="research-view">
    <button @click="unlock">Unlock hub</button>
  </div>
</template>

<script>
export default {
  name: 'ResearchView',
  methods: {
    unlock() {
      this.$store.commit('unlock', {
        type: 'Tier 0',
        name: 'Hub upgrade 1',
      });
    },
  },
};
</script>

<style scoped>
  .research-view {
    margin-top: 1rem;
  }
</style>
