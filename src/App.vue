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
import { getDoc, doc} from '@firebase/firestore';
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',

  data: () => ({
  }),
  methods: {
    ...mapActions(['setUser'])
  },
  created () {
    const self = this
    let user_id = localStorage.getItem('user_id')
    if (user_id !== null) {
      let ref = doc(db, 'users', user_id)
      getDoc(ref).then(user => {
        self.setUser({id: user.id, ...user.data()})
      })
    }
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
