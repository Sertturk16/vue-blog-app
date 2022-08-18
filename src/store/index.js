import Vue from 'vue'
import Vuex from 'vuex'

import blog from './modules/blog'
import session from './modules/session'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    blog,
    session
  }
})
