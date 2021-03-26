import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import { globalStore } from './store'
import GAuth from 'vue-google-oauth2'
import axios from 'axios'

const gauthOption = {
  clientId: '59941947881-bkemibi7ccpsea594561v0i5n7eils9h.apps.googleusercontent.com',
  scope: 'email profile https://www.googleapis.com/auth/calendar.events.readonly',
  fetch_basic_profile: false,
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption)

Vue.prototype.$http = axios.create({
  baseURL: 'https://pda-backend.herokuapp.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000
})

Vue.prototype.$globals = globalStore
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
