<template>
  <div class="ingredient">
    <img :src="imageSrc" alt="ingredient"/>
    <label>{{number}}x {{name}}</label>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    name: String,
    type: String,
    number: Number,
  },
  data() {
    return {
      imageSrc: `${process.env.BASE_URL}images/${this.type}/${this.name}.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
  .ingredient {
    display: inline-flex;
    flex-direction: row;
    line-height: 1.5rem;

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
</style>
