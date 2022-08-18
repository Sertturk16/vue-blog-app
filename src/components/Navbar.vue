<template>
  <nav class="navbar">
    <router-link to="/"><h1>The Dojo Blog</h1></router-link>
    <div class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/create" v-if="token">Create</router-link>
        <router-link to="/login" v-if="!token">Login/Sign Up</router-link>
        <a v-if="token" @click.prevent="_logout()">Log Out</a>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      token: state => state.session.token
    })
  },
  methods: {
    ...mapActions(['logout']),
    _logout () {
      this.$user.set({role: 'guest'})
      this.logout()
    }
  }
}
</script>