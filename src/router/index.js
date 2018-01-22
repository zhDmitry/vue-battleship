import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/home-page';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
    },
  ],
});
