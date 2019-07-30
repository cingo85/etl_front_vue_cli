import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/mainpage/LoginView.vue'
import FunctionTable from './views/mainpage/FunctionTableView.vue'
import indexPage from './views/mainpage/indexPageView.vue'
import NotFound from './views/otherpage/404.vue'
import statistics from './views/mainpage/statisticsView.vue'
import projectPage from './views/mainpage/projectPageView.vue'
import Register from './views/mainpage/registerView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      component: NotFound

    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/functionTable',
      name: 'functionTable',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FunctionTable
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: indexPage
    },
    {
      path: '/projectPage',
      name: 'projectPage',
      component: projectPage
    }, {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    }

  ]
})
