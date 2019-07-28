import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from "vue-class-component";
import 'jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/animate.css'
import '../src/assets/css/style.css'



Vue.config.productionTip = false
Vue.use(Vuex);
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
}).$mount('#app')