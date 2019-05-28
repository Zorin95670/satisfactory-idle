<template>
  <div class="inventory-view">
    <div v-for="type in types" v-bind:key="type">
      <div class="panel" @click="visibilities[type] = !visibilities[type]">
        <font-awesome-icon
          icon="chevron-right"
          class="panel-icon"
          v-if="!visibilities[type]"/>
        <font-awesome-icon
          icon="chevron-down"
          class="panel-icon"
          v-else/>
        <label>{{type}}s</label>
      </div>
      <div v-if="visibilities[type]" class="inventory-items">
        <inventory-item
          v-for="item in resources[type]"
          v-bind:key="item.name"
          :name="item.name"
          :type="type"
          :resource="item.resource"/>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryItem from '@/components/InventoryItem.vue';

export default {
  name: 'Inventory',
  components: { InventoryItem },
  data() {
    const types = ['ore', 'ingot', 'item'];

    const visibilities = {
      ore: true,
      ingot: true,
      item: true,
    };

    const resources = {};

    types.forEach((type) => {
      resources[type] = [];

      Object.keys(this.$store.state.resources[type])
        .filter(name => this.$store.state.resources[type][name].unlock)
        .forEach((name) => {
          resources[type].push({
            name,
            resource: this.$store.state.resources[type][name],
          });
        });
    });

    return {
      visibilities,
      resources,
      types,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '@/assets/satisfactory.scss';

  .inventory-view {
    display: flex;
    flex-direction: column;

    .inventory-items {
      margin-top: 1rem;
    }
  }
</style>
