<template>
<div class="session-container">
  <div class="session">
    <p>Already have an account? <router-link to="login">Login</router-link></p>
    <h2 class="dojo-h2">Sign Up to Dojo-Blog</h2>
    <v-form class="dojo-form">
      <v-text-field
        prepend-inner-icon="mdi-account"
        class="my-2 dojo-input"
        label="First Name"
        hide-details="auto"
        type="text"
        outlined
        dense
        v-model="first_name"
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="mdi-account"
        class="my-2 dojo-input"
        label="Last Name"
        hide-details="auto"
        type="text"
        outlined
        dense
        v-model="last_name"
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="mdi-account"
        class="my-2 dojo-input"
        label="Username"
        hide-details="auto"
        type="text"
        outlined
        dense
        v-model="username"
      ></v-text-field>
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
        <p v-if="false">Unexpected error occured.</p>
      </div>
      <button @click.prevent="_signUp" class="dojo-btn">Sign Up</button>
    </v-form>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    error: false
  }),
  methods: {
    ...mapActions(['signUp']),
    _signUp() {
      this.error = false
      this.signUp({
        fist_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password
      }).catch((err) => {
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