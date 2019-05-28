<template>
  <div class="research-view">
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
      <label>{{type}}</label>
    </div>
    <div v-if="visibilities[type]" class="research">
      <research-unlocker
        v-for="o in researchList[type]"
        v-bind:key="o.name"
        :name="o.name"
        :research="o.research"
        @unlock="initResearch()"/>
    </div>
  </div>
  </div>
</template>

<script>
import ResearchUnlocker from '@/components/ResearchUnlocker.vue';

export default {
  name: 'ResearchView',
  components: { ResearchUnlocker },
  data() {
    const types = [];
    const visibilities = Object.keys(this.$store.state.research)
      .reduce((acc, type) => {
        acc[type] = true;
        types.push(type);
        return acc;
      }, {});

    const researchList = this.getUnlockReseach(types);

    return {
      types,
      visibilities,
      researchList,
    };
  },
  methods: {
    initResearch() {
      this.researchList = this.getUnlockReseach(this.types);
    },
    getUnlockReseach(types) {
      return types.reduce((researchList, type) => {
        researchList[type] = [];

        Object.keys(this.$store.state.research[type])
          .filter(name => this.$store.state.research[type][name].unlock)
          .forEach((name) => {
            researchList[type].push({
              name,
              research: this.$store.state.research[type][name],
            });
          });

        return researchList;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/assets/satisfactory.scss';

  .research-view {
    display: flex;
    flex-direction: column;

    .research {
      margin-top: 1rem;
    }
  }
</style>
