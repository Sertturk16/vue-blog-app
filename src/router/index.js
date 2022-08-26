import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Create from '../views/Create'
import BlogDetail from '../views/BlogDetail'
import Login from '../views/session/Login'
import SignUp from '../views/session/SignUp'
import ForgotPassword from '../views/session/ForgotPassword'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      permissions: [
        {
        role: 'guest',
        access: false,
        redirect: 'Home'
        }
      ]
    }
  },
  {
    path: '/blogs/:id',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      permissions: [
        {
        role: 'user',
        access: false,
        redirect: 'Home'
        }
      ]
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      permissions: [
        {
        role: 'user',
        access: false,
        redirect: 'Home'
        }
      ]
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      permissions: [
        {
        role: 'user',
        access: false,
        redirect: 'Home'
        }
      ]
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
