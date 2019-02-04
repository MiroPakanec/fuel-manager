import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'overview',
      component: () => import("./views/Overview.vue")
    },
    {
      path: '/overview',
      name: 'overview',

      component: () => import("./views/Overview.vue")
    },
    {
      path: '/new',
      name: 'new',

      component: () => import('./views/New.vue')
    },
    {
      path: '/stats',
      name: 'stats',

      component: () => import('./views/Stats.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',

      component: () => import('./views/Timeline.vue')
    }
  ]
})
