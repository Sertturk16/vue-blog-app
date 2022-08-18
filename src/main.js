import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouterUserRoles from "vue-router-user-roles"
import store from './store'
import { initializeApp } from "firebase/app"

import './assets/index.css'
import vuetify from './plugins/vuetify'

Vue.use(VueRouterUserRoles, { router })

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyC9eLrn80ZT7LWoGkzBoJnMVz9VYE5zJAE",
  authDomain: "vue-dojo-blog-app.firebaseapp.com",
  projectId: "vue-dojo-blog-app",
  storageBucket: "vue-dojo-blog-app.appspot.com",
  messagingSenderId: "972944661151",
  appId: "1:972944661151:web:0ec7edc9a7c8ce2f75a0aa",
  measurementId: "G-3XLCT86YV8"
}

initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
