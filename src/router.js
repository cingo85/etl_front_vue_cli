import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import FunctionTable from './views/FunctionTable.vue'
import indexPage from './views/indexPage.vue'
import NotFound from './views/404.vue'
import projectChangePage from './views/projectChangePage.vue'
import header from './views/header.vue'
import footer from './views/footer.vue'

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
      component: FunctionTable
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: indexPage,
      children: [
        {
          path: 'projectChangePage',
          name: 'projectChangePage',
          component: projectChangePage
        }
      ]
    }
  ]
})
