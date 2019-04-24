import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const routerMap = [{
  path: '/',
  component: () => import('./view/Login'),
}];

export default new Router({
  routes: routerMap
})
