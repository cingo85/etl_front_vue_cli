import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
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
import bootstrap4toggle from 'bootstrap4-toggle'
import tableDragger from 'table-dragger'

global.URLSearchParams = URLSearchParams
Vue.config.productionTip = false
Vue.prototype.$ = $;
Vue.prototype.axios = axios

Vue.use(Vuex);
Vue.use(UUID);
Vue.use(VuePapaParse)
Vue.use(bootstrap4toggle)
Vue.use(tableDragger)


new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
}).$mount('#app')