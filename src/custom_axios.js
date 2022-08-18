import axios from 'axios'

const main = axios.create({
  baseURL: 'https://vue-dojo-blog-app-default-rtdb.firebaseio.com/'
})
const signUp = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9eLrn80ZT7LWoGkzBoJnMVz9VYE5zJAE'
})

const login = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9eLrn80ZT7LWoGkzBoJnMVz9VYE5zJAE'
  })

export const $service = { main, signUp, login }