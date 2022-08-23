<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="content">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { Application } from 'vuetify/lib/services';
import { mapActions, mapMutations } from 'vuex';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',

  data: () => ({
  }),
  methods: {
    ...mapMutations(['_setToken']),
    ...mapActions(['startTimer'])
  },
  mounted () {
    let token = localStorage.getItem('token')
    let expires_in = localStorage.getItem('expires_in')
    let now = new Date().getTime()
    if (token) {
      if (now > expires_in) {
        this._setToken('')
      } else {
        this.startTimer(expires_in - now)
        this._setToken(token)
      }
    }
  },
  components: { Navbar },
};
</script>

<style>
.v-application--wrap {
  position: relative;
}
</style>
