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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    path: '/audiotest',
    name: 'Audiotest',
    component: () => import(/* webpackChunkName: "tests" */ '../views/AudioTest.vue')
  },
  {
    path: '/calendartest',
    name: 'CalendarTest',
    component: () => import(/* webpackChunkName: "tests" */ '../views/CalendarTest.vue')
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
