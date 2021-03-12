import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import AudioTest from '../views/AudioTest.vue'
import CalendarTest from '../views/CalendarTest.vue'

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
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/audiotest',
    name: 'Audiotest',
    component: AudioTest
  },
  {
    path: '/calendartest',
    name: 'CalendarTest',
    component: CalendarTest
  }
]

const router = new VueRouter({
  routes
})

export default router
