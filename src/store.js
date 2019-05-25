import Vue from 'vue';
import Vuex from 'vuex';
import Resource from './models/Resource';
import Recipe from './models/Recipe';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resources: {
      ore: {
        iron: new Resource(true),
        copper: new Resource(),
        limestone: new Resource(),
        coal: new Resource(),
        crudeOil: new Resource(),
        caterium: new Resource(),
        rawQuartz: new Resource(),
        sulfur: new Resource(),
        bauxite: new Resource(),
        sam: new Resource(),
        silica: new Resource(),
        uranium: new Resource(),
      },
      ingot: {
        'iron-ingot': new Resource(true),
      },
      item: {
        'iron-plate': new Resource(true),
        'iron-rod': new Resource(true),
      },
    },
    recipes: {
      'iron-ingot': new Recipe('iron-ingot', 'ingot'),
      'iron-plate': new Recipe('iron-plate'),
      'iron-rod': new Recipe('iron-rod'),
    },
    technologies: {
      tiers: [{
        logistics: false,
        utility: false,
      }],
    },
  },
  mutations: {
    increment(state, resource) {
      state.resources[resource.type][resource.name].increment(parseInt(resource.number, 10));
    },
    decrement(state, resource) {
      state.resources[resource.type][resource.name].decrement(parseInt(resource.number, 10));
    },
  },
  actions: {},
});
