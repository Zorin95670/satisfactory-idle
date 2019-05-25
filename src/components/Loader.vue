<template>
  <progress :value="value | getPercent(timer)" max="100"></progress>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    timer: Number,
    active: Boolean,
  },
  data() {
    return {
      value: 0,
      id: null,
    };
  },
  filters: {
    getPercent(value, timer) {
      const number = parseInt(value / (timer - 50) * 100, 10);
      return number > 100 ? 100 : number;
    },
  },
  methods: {
    start() {
      this.id = setInterval(() => {
        this.value += 50;
      }, 50);
    },
    stop() {
      clearInterval(this.id);
    },
  },
  watch: {
    active(newValue) {
      if (newValue === true) {
        this.start();
        return;
      }

      this.value = 0;
      this.stop();
    },
  },
};
</script>

<style scoped>

</style>
