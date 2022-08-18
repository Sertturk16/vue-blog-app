<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="content">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    ...mapMutations(['_setToken'])
  },
  mounted () {
    let token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      this._setToken(token)
    }
  },
  components: { Navbar }
};
</script>
