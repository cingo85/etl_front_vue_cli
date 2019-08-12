import Vue from 'vue'
import Vuex from 'vuex'

import IndexPage_module from '../src/store/IndexPage'
import ProjectPage_module from '../src/store/ProjectPage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    IndexPage_module,
    ProjectPage_module
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
})


