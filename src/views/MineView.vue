<template>
  <div class="mine-view">
    <ore-miner
      v-for="ore in ores"
      v-bind:key="ore.name"
      :name="ore.name"
      :level="1"/>
  </div>
</template>

<script>
import OreMiner from '@/components/OreMiner.vue';

export default {
  name: 'MineView',
  components: { OreMiner },
  data() {
    const ores = [];

    Object.keys(this.$store.state.resources.ore)
      .filter(name => this.$store.state.resources.ore[name].unlock)
      .forEach((key) => {
        ores.push(this.$store.state.resources.ore[key]);
      });

    return {
      ores,
    };
  },
};
</script>

<style scoped>
.mine-view {
  margin-top: 1rem;
}
</style>
