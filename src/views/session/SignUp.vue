<template>
<div class="session-container">
  <div class="session">
    <p>Already have an account? <router-link to="login">Login</router-link></p>
    <h2 class="dojo-h2">Sign Up to Dojo-Blog</h2>
    <v-form class="dojo-form" ref="signUpForm">
      <v-text-field
        prepend-inner-icon="mdi-account"
        class="my-2 dojo-input"
        label="First Name"
        hide-details="auto"
        type="text"
        outlined
        dense
        v-model="first_name"
        :rules="[
          v => !!v || ''
        ]"
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
        :rules="[
          v => !!v || ''
        ]"
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
        :rules="[
          v => !!v || ''
        ]"
      ></v-text-field>
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
        v-model="password"
        :rules="[
          v => !!v || ''
        ]"
      ></v-text-field>
      <div class="dojo-alert">
        <p v-if="invalid">The information you entered is invalid.</p>
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
    invalid: false,
  }),
  methods: {
    ...mapActions(['signUp']),
    _signUp() {
      this.invalid = false
      if (this.$refs.signUpForm.validate() === false) {
        this.invalid = true
        return
      }
      this.signUp({
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password
      }).catch((err) => {
        if(err === 400) {
          this.invalid = true
        }  
      })
    }
  }
}
</script>

<style>

</style>