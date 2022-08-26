import { db } from "@/main"
import {addDoc, doc, collection, getDoc, getDocs, query, where, deleteDoc} from 'firebase/firestore'
import store from "@/store"
const state = {
  blogs: [],
  blogDetail: {},
  user_blogs: []
}
const getters = {}
const actions = {
  deleteBlog ({ commit }, payload) {
    return new Promise(resolve => {
      let ref = doc(db, "blogs", payload)
      deleteDoc(ref).then(res => {
        commit('_deleteBlog', payload)
        resolve()
      })
    })
  },
  createNewBlog ({ commit }, payload) {
    return new Promise(resolve => {
      let user = store.state.session.user
      let ref = collection(db, "blogs")
      addDoc(ref, {author: user.username, title: payload.title, body: payload.body, user_id: user.id}).then(res => {
        commit('_createNewBlog', {id: res.id, author: user.username, title: payload.title, body: payload.body, user_id: user.id})
        resolve()
      })
    })
  },
  getUserBlogs ({ commit }, payload) {
    return new Promise(resolve => {
        let ref = collection(db, 'blogs')
        getDocs(query(ref, where('user_id', '==', payload)))
        .then(res => {
            let arr = []
            res.forEach(item => {
              arr.push({...item.data(), id: item.id})
            })
            commit('_getUserBlogs', arr)
            resolve()
        })
    })
  },
  getAllBlogs ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let ref = collection(db, 'blogs')
        getDocs(ref)
        .then(res => {
          let arr = []
          res.forEach(item => {
            arr.push({...item.data(), id: item.id})
          })
        commit('_getAllBlogs', arr)
        resolve()
      })
    })
  },
  getBlogDetail ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let ref = doc(db, 'blogs', payload)
      getDoc(ref).then(res => {
        commit('_getBlogDetail', {id: res.id, ...res.data()})
        resolve()
      })
    })
  }
}
const mutations = {
  _getBlogDetail(state, payload) {
    state.blogDetail = payload
  },
  _getAllBlogs (state, payload) {
    state.blogs = [...payload]
  },
  _getUserBlogs (state, payload) {
    state.user_blogs = [...payload]
  },
  _deleteBlog (state, payload) {
    state.blogs = state.blogs.filter(item => item.id !== payload)
  },
  _createNewBlog (state, payload) {
    state.blogs.push(payload)
  },
}

export default {
    state, getters, actions, mutations
}