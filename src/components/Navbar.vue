<template>
  <nav class="navbar">
    <router-link to="/"><h1>The Dojo Blog</h1></router-link>
    <div class="links" v-if="!mobile">
        <router-link to="/">Home</router-link>
        <router-link to="/create" v-if="token">Create</router-link>
        <router-link to="/login" v-if="!token">Login/Sign Up</router-link>
        <a v-if="token" @click.prevent="_logout()">Log Out</a>
    </div>
    <v-btn class="menu-icon" v-if="mobile" icon @click="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn>
    <v-navigation-drawer
        v-if="mobile"
        v-model="drawer"
        absolute
        right
        temporary
        class="mobile-nav"
      >
        <router-link to="/">
          <h1>The Dojo Blog</h1>
        </router-link>
        <v-list
          nav
        >
          <v-list-item-group
            v-model="group"
          >
          
            <router-link to="/" exact active-class="dojo-mobile-active">
                <v-list-item>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link exact to="/create" active-class="dojo-mobile-active">
              <v-list-item v-if="token">
                <v-list-item-title>Create</v-list-item-title>
              </v-list-item>
              
            </router-link>

            <router-link exact to="/login" active-class="dojo-mobile-active">
              <v-list-item v-if="!token">
                <v-list-item-title>Login/Sign Up</v-list-item-title>
              </v-list-item>  
            </router-link>
          
            <v-list-item v-if="token" @click="logout()">
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  created () {
    this.setMobile()
    window.addEventListener('resize', this.setMobile)
  },
  data: () => ({
    mobile: false,
    drawer: false,
    group: null
  }),
  computed: {
    ...mapState({
      token: state => state.session.token
    })
  },
  methods: {
    ...mapActions(['logout']),
    _logout () {
      this.logout()
    },
    setMobile () {
      this.mobile = window.innerWidth < 800
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>