<template>
  <div v-bind:class="classes">
    <div class="detail">
      <label>{{name | formatName}}</label>
      <label>lvl {{level}}</label>
    </div>
    <label>{{value | formatValue(symbols)}}</label>
    <progress :value="time" min="0" max="100"></progress>
  </div>
</template>

<script>
export default {
  name: 'ResourceViewer',
  data() {
    const classes = {
      'resource-viewer': true,
    };

    classes[this.name] = true;

    return {
      symbols: ['', 'k', 'M', 'G', 'T', 'P', 'E'],
      classes,
    };
  },
  props: {
    name: String,
    level: Number,
    time: Number,
    value: Number,
  },
  filters: {
    formatName(name) {
      return name.charAt(0)
        .toUpperCase() + name.slice(1);
    },
    formatValue(number, symbols) {
      if (!number || number === 0) {
        return 0;
      }
      if (number < 1) {
        return number.toFixed(2);
      }
      let tier = parseInt(Math.log10(number) / 3, 10);

      if (tier === 0) {
        return number;
      }

      if (tier > symbols.length) {
        tier = symbols.length;
      }

      return (number / (10 ** (tier * 3))).toFixed(1) + symbols[tier];
    },
  },
};
</script>

<style lang="scss" scoped>
  .resource-viewer {
    display: inline-flex;
    flex-direction: column;
    border: 0.1rem solid black;

    .detail {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: .15rem;
    }
  }
</style>
