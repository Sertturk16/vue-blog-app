<template>
  <div class="session-container">
    <div class="session">
      <p>Don't have an account? <router-link to="/sign-up">Sign Up</router-link></p>
      <h2 class="dojo-h2">Login to Dojo-Blog</h2>
      <v-form class="dojo-form">
        <v-text-field
          prepend-inner-icon="mdi-email"
          class="my-2 dojo-input"
          label="Email"
          hide-details="auto"
          type="text"
          outlined
          dense
          v-model="email"
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="mdi-lock"
          class="my-2 dojo-input"
          label="Password"
          hide-details="auto"
          type="password"
          outlined
          dense
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
      this.login({email: this.email, password: this.password})
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