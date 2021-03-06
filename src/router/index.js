import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: '404',
    component: Home
  }
];
// Lazy load example
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
