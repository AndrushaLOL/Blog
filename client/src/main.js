// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'Vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Backendless from 'backendless';
require('vue2-animate/dist/vue2-animate.min.css')

const APP_ID = '51539983-E9FB-DA40-FFA9-9C49BBA74300';
const API_KEY = 'E149EAB8-657E-B0E8-FF6F-A9A70D266D00';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

Vue.use(Vuetify)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
