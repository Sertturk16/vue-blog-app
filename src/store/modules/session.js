import Vue from "vue"
import {doc, getDoc, setDoc} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "@/main"
const state = {
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
    })
  },
}
const mutations = {
}

export default {
    state, getters, actions, mutations
}