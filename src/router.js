import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import InventoryView from '@/views/InventoryView.vue';
import CraftView from '@/views/CraftView.vue';
import MineView from '@/views/MineView.vue';
import ResearchView from '@/views/ResearchView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
    },
    {
      path: '/mine',
      name: 'mine',
      component: MineView,
    },
    {
      path: '/craft',
      name: 'craft',
      component: CraftView,
    },
    {
      path: '/research',
      name: 'research',
      component: ResearchView,
    },
  ],
});
