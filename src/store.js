import Vue from 'vue'
import Vuex from 'vuex'

import IndexPage_module from '../src/store/IndexPage'
import ProjectPage_module from '../src/store/ProjectPage'
import FunctionTable_module from '../src/store/FunctionTable'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    IndexPage_module,
    ProjectPage_module,
    FunctionTable_module
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


