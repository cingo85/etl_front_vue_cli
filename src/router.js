import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import FunctionTable from './components/FunctionTable.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/functionTable',
      name: 'functionTable',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:FunctionTable
    },
   
  ]
})
