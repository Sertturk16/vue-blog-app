import Vue from "vue"
import { $service } from "@/custom_axios"
const state = {
  isUser: false,
  token: ''
}
const getters = {}
const actions = {
  signUp ({commit} ,payload) {
    return new Promise((resolve, reject) => {
      $service.signUp.post('', {email: payload.email, password: payload.password, returnSecureToken: true}).then((res) => {
        commit('_setToken', res.data.idToken)
        resolve()
      }).catch((err) => {
        reject(err.response.status)
      })
    })
  },
  login ({commit}, payload) {
    return new Promise((resolve, reject) => {
      $service.login.post('', {email: payload.email, password: payload.password, returnSecureToken: true})
      .then((res) => {
        commit('_setToken', res.data.idToken)
        resolve()
      }).catch((err) => {
        console.log(err)
        reject(err.response.status)
      })
    })
  },
  logout ({commit}) {
    commit('_setToken', '')
  }
}
const mutations = {
  _setToken (state, payload) {
    if (payload === '') {
      Vue.prototype.$user.set({role: 'guest'})
      localStorage.removeItem('token')
    } else {
      Vue.prototype.$user.set({role: 'user'})
      localStorage.setItem('token', payload)
    }
    state.token = payload
  }
}

export default {
    state, getters, actions, mutations
}