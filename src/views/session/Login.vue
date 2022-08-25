<template>
  <div class="session-container">
    <div class="session">
      <p>Don't have an account? <router-link to="/sign-up">Sign Up</router-link></p>
      <h2 class="dojo-h2">Login to Dojo-Blog</h2>
      <v-form class="dojo-form" ref="loginForm">
        <v-text-field
          prepend-inner-icon="mdi-email"
          class="my-2 dojo-input"
          label="Email"
          hide-details="auto"
          type="email"
          outlined
          dense
          v-model="email"
          :rules="[
             v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '',
             v => !!v || ''
          ]"
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="mdi-lock"
          class="my-2 dojo-input"
          label="Password"
          hide-details="auto"
          type="password"
          outlined
          dense
          :rules="[
             v => !!v || ''
          ]"
          v-model="password"
        ></v-text-field>
        <div class="dojo-alert">
          <p v-if="error">Your email or password is invalid</p>
        </div>
        <button class="dojo-btn" @click.prevent="_login">Login</button>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    email: null,
    password: null,
    error: false
  }),
  methods: {
    ...mapActions(['login']),
    _login() {
      this.error = false
      if (this.$refs.loginForm.validate() === false) {
        this.error = true
        return
      }
      this.login({email: this.email, password: this.password})
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        if(err === 400) {
          this.error = true
        }  
      })
    }
  }
}
</script>

<style>

</style>