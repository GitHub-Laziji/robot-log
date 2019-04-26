import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const menuRouterMap = [{
  path: 'config',
  meta: {
    title: "配置"
  },
  component: () => import('./view/Config')
}, {
  path: 'day',
  meta: {
    title: "日报"
  },
  component: () => import('./view/Config')
}]

export const routerMap = [{
  path: '/',
  redirect: "/login"
}, {
  path: '/login',
  component: () => import('./view/Login'),
}, {
  path: '/sign',
  component: () => import('./view/Sign'),
}, {
  path: "/home",
  component: () => import('./view/layout/Layout'),
  children: menuRouterMap
}];

export default new VueRouter({
  routes: routerMap
})
