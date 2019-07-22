import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/animate.css'

Vue.config.productionTip = false

new Vue({
    el:'#app',
    render: h => h(App),
    store,
    router
  }).$mount('#app')