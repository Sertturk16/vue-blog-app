<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="content">
      <router-view/>
    </v-main>
    <notifications></notifications>
  </v-app>
</template>

<script>
import { db } from './main';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { getDoc, doc } from '@firebase/firestore';
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',

  data: () => ({
  }),
  methods: {
    ...mapActions(['startTimer'])
  },
  created () {
    const self = this
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      console.log(user)
      if (!user) {
        localStorage.removeItem('user')
        self.$user.set({role: 'guest'})
      } else {
        let ref = doc(db, 'users', user.uid)
        getDoc(ref)
        .then(res => {
          localStorage.setItem('user', JSON.stringify({id: user.uid, first_name: res.data().first_name, last_name: res.data().last_name}))
          self.$user.set({role: 'user'})
        })
        .then(() => {
          if (self.$route.name !== 'Home') {
            self.$router.push({name: 'Home'})
          }
        })
      }
    })
  },
  mounted () {
    
  },
  components: { Navbar },
};
</script>

<style>
.v-application--wrap {
  position: relative;
}
</style>
