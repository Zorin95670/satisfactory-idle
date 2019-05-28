<template>
  <div class="inventory-item">
    <label>{{name}}</label>
    <img :src="imageSrc" alt="item"/>
    <label>{{resource.total}} / {{resource.limit}}</label>
  </div>
</template>

<script>
import Resource from '../models/Resource';

export default {
  name: 'InventoryItem',
  props: {
    name: String,
    type: String,
    resource: Resource,
  },
  data() {
    return {
      active: false,
      imageSrc: `${process.env.BASE_URL}images/${this.type}/${this.name}.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
  .inventory-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.5rem;
    border: 0.25rem solid grey;
    border-radius: 0.5rem;
    background-color: white;
    color: black;
    font-weight: bold;
    padding: 0.5rem;
    width: 10rem;
    margin-left: 0.75rem;
    margin-right: 0.75rem;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
