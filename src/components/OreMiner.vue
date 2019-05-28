<template>
  <div class="ore-miner">
    <label>Mine: {{name}}</label>
    <img :src="imageSrc" alt="mine">
    <button :disabled="active" @click="mine">Mine</button>
    <loader :timer="3000" :active="active"/>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';

export default {
  name: 'OreMiner',
  components: { Loader },
  props: {
    name: String,
    level: Number,
  },
  data() {
    return {
      active: false,
      imageSrc: `${process.env.BASE_URL}images/ore/${this.name}.png`,
    };
  },
  methods: {
    mine() {
      this.active = true;

      setTimeout(() => {
        this.active = false;
        this.$store.commit('increment', {
          type: 'ore',
          name: this.name,
          number: 3 * this.level,
        });
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.ore-miner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.25rem solid grey;
  border-radius: 0.5rem;
  background-color: white;
  color:black;
  padding: 0.5rem;
  width: 10rem;
  margin-left: 0.75rem;

  img {
    width: 3rem;
    height: 3rem;
  }
}
</style>
