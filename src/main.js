import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/animate.css'
import '../src/assets/css/style.css'
import '../src/api'
import axios from "axios";
import { URLSearchParams } from "url";
import UUID from 'uuid'
import VuePapaParse from 'vue-papa-parse'


global.URLSearchParams = URLSearchParams
Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(Vuex);
Vue.use(UUID);
Vue.use(VuePapaParse)


new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
}).$mount('#app')