import { db } from "@/main"
import {addDoc, doc, collection, getDoc, getDocs, query, where, deleteDoc} from 'firebase/firestore'

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
        resolve()
      })
    })
  },
  createNewBlog ({ commit }, payload) {
    return new Promise(resolve => {
      let user = JSON.parse(localStorage.getItem('user'))
      let ref = collection(db, "blogs")
      addDoc(ref, {author: `${user.first_name} ${user.last_name}`, title: payload.title, body: payload.body, user_id: user.id}).then(res => {
        resolve()
      })
    })
  },
  getUserBlogs ({ commit }, payload) {
    return new Promise(resolve => {
        let user = JSON.parse(localStorage.getItem('user'))
        let ref = collection(db, 'blogs')
        getDocs(query(ref, where('user_id', '==', user.id)))
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
  }
}

export default {
    state, getters, actions, mutations
}