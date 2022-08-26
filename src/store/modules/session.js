import {doc, getDoc, setDoc} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { db } from "@/main"
const state = {
  user: null
}
const getters = {}
const actions = {
  signUp ({commit, dispatch} ,payload) {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((res) => {
        let ref = doc(db, "users", res.user.uid)
        setDoc(ref, {email: payload.email, first_name: payload.first_name, last_name: payload.last_name, username: payload.username})
        .then(() => {
          commit('_setUser',{id: user.id, ...user.data()})
          resolve()
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  resetPassword ({commit}, payload) {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, payload)
      .then(() => {
        resolve()
      })
      .catch((err) => {
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
          commit('_setUser',{id: user.id, ...user.data()})
          resolve()
        })
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  setUser ({commit}, payload) {
    commit('_setUser', payload)
  },
  logout ({commit}) {
    const auth = getAuth()
    signOut(auth).then(() => {
    })
  },
}
const mutations = {
  _setUser (state, payload) {
    state.user = payload
  }
}

export default {
    state, getters, actions, mutations
}