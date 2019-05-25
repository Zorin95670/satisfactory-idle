<template>
  <div class="mine-view">
    <ore-miner name="iron" :level="1"/>
  </div>
</template>

<script>
import OreMiner from '@/components/OreMiner.vue';

export default {
  name: 'MineView',
  components: { OreMiner },
};
</script>

<style scoped>

</style>
