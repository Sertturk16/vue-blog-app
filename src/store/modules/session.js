import Vue from "vue"
import {doc, getDoc, setDoc} from 'firebase/firestore'
import { $service } from "@/custom_axios"
import { db } from "@/main"
const state = {
  isUser: false,
  token: '',
  user: null
}
const getters = {}
const actions = {
  signUp ({commit, dispatch} ,payload) {
    return new Promise((resolve, reject) => {
      console.log(payload)
      $service.signUp.post('', {email: payload.email, password: payload.password, returnSecureToken: true}).then((res) => {
        let ref = doc(db, "users", res.data.localId)
        setDoc(ref, {email: payload.email, first_name: payload.first_name, last_name: payload.last_name, username: payload.username})
        .then(() => {
          commit('_setToken', res.data.idToken)
          localStorage.setItem('expires_in', new Date().getTime() + +res.data.expiresIn*1000)
          dispatch('startTimer', res.data.expiresIn*1000)
          commit('_setUser', payload)
          resolve()
        })
      }).catch((err) => {
        reject(err.response.status)
      })
    })
  },
  login ({commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      $service.login.post('', {email: payload.email, password: payload.password, returnSecureToken: true})
      .then((res) => {
        let ref = doc(db, "users", res.data.localId)
        getDoc(ref).then(user => {
          commit('_setUser', {...user.data(), id: res.data.localId})
          commit('_setToken', res.data.idToken)
          localStorage.setItem('expires_in', new Date().getTime() + +res.data.expiresIn*1000)
          dispatch('startTimer', res.data.expiresIn*1000)
          resolve()
        })
      }).catch((err) => {
        reject(err.response.status)
      })
    })
  },
  logout ({commit}) {
    commit('_setToken', '')
    commit('_setUser', null)
    window.location.reload()
  },
  startTimer ({dispatch}, payload) {
    console.log(payload)
    setTimeout(() => {
      dispatch('logout')
    }, payload)
  }
}
const mutations = {
  _setUser (state, payload) {
    payload === null ? localStorage.removeItem('user') : localStorage.setItem('user', JSON.stringify(payload))
  },
  _setToken (state, payload) {
    if (payload === '') {
      Vue.prototype.$user.set({role: 'guest'})
      localStorage.removeItem('token')
      localStorage.removeItem('expires_in')
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