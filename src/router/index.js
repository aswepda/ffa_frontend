import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Agent from '../views/Agent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/agent',
    name: 'Agent',
    component: Agent,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
