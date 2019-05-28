import Vue from 'vue';
import Vuex from 'vuex';
import Resource from './models/Resource';
import Recipe from './models/Recipe';
import ResourcesList from '@/assets/resources.json';
import RecipesList from '@/assets/recipes.json';
import ResearchList from '@/assets/research.json';

Vue.use(Vuex);
const types = ['resources', 'recipes', 'research'];
let resources = {};
let recipes = {};
let research = {};

types.forEach((key) => {
  let list;
  if (key === 'resources') {
    list = ResourcesList;
  } else if (key === 'recipes') {
    list = RecipesList;
  } else {
    list = ResearchList;
  }
  const object = Object.keys(list)
    .reduce((acc, type) => {
      acc[type] = Object.keys(list[type])
        .reduce((acc1, name) => {
          if (key === 'resources') {
            acc1[name] = new Resource(name, list[type][name]);
          } else if (key === 'recipes') {
            acc1[name] = new Recipe(name, list[type][name]);
          } else {
            acc1[name] = list[type][name];
          }

          return acc1;
        }, {});
      return acc;
    }, {});

  if (key === 'resources') {
    resources = object;
  } else if (key === 'recipes') {
    recipes = object;
  } else {
    research = object;
  }
});

export default new Vuex.Store({
  state: {
    types,
    resources,
    recipes,
    research,
  },
  mutations: {
    increment(state, resource) {
      state.resources[resource.type][resource.name].increment(parseInt(resource.number, 10));
    },
    decrement(state, resource) {
      state.resources[resource.type][resource.name].decrement(parseInt(resource.number, 10));
    },
    unlock(state, resource) {
      state.research[resource.type][resource.name].unlock = false;
      const researchName = `${resource.type} - ${resource.name}`;

      state.types.forEach((key) => {
        Object.keys(state[key])
          .forEach((type) => {
            Object.keys(state[key][type])
              .filter(name => !state[key][type][name].unlock
                && state[key][type][name].lockBy === researchName)
              .forEach((name) => {
                state[key][type][name].unlock = true;
              });
          });
      });
    },
  },
  actions: {},
});
