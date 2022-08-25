import Vue from "vue"
import {doc, getDoc, setDoc} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "@/main"
const state = {
  token: '',
}
const getters = {}
const actions = {
  signUp ({commit, dispatch} ,payload) {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((res) => {
        console.log(res)
        let ref = doc(db, "users", res.user.uid)
        setDoc(ref, {email: payload.email, first_name: payload.first_name, last_name: payload.last_name, username: payload.username})
        .then(() => {
          commit('_setToken', res._tokenResponse.idToken)
          localStorage.setItem('expires_in', new Date().getTime() + +res._tokenResponse.expiresIn*1000)
          dispatch('startTimer', res._tokenResponse.expiresIn*1000)
          commit('_setUser', {id: res.user.uid, ...payload})
          resolve()
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  login ({commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((res) => {
        let ref = doc(db, "users", res.user.uid)
        getDoc(ref).then(user => {
          commit('_setUser', {...user.data(), id: res.user.uid})
          commit('_setToken', res._tokenResponse.idToken)
          localStorage.setItem('expires_in', new Date().getTime() + +res._tokenResponse.expiresIn*1000)
          dispatch('startTimer', res._tokenResponse.expiresIn*1000)
          resolve()
        })
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  logout ({commit}) {
    const auth = getAuth()
    signOut(auth).then(() => {
      commit('_setToken', '')
      commit('_setUser', null)
    })
  },
  startTimer ({dispatch}, payload) {
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