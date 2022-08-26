import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouterUserRoles from "vue-router-user-roles"
import store from './store'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Notifications from 'vue-notification'
import "./assets/index.scss"
import vuetify from './plugins/vuetify'

Vue.use(VueRouterUserRoles, { router })
Vue.use(Notifications)
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

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

const auth = getAuth()
  onAuthStateChanged(auth, user => {
  if (!user) {
    localStorage.removeItem('user_id')
    Vue.prototype.$user.set({role: 'guest'})
  } else {
    localStorage.setItem('user_id', user.uid)
    Vue.prototype.$user.set({role: 'user'})
  }
})

Vue.prototype.$user.set({role: 'guest'})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
