<template>
  <div class="session-container">
    <div class="session">
      <h2 class="dojo-h2">Reset Your password?</h2>
      <p class="forgot-password-text mt-2">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
      <v-form class="dojo-form" ref="forgotPassword">
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
        <button class="dojo-btn" @click.prevent="_resetPassword">Send</button>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    email: null,
    disabled_: false
  }),
  methods: {
    ...mapActions(['resetPassword']),
    _resetPassword () {
      let self = this
      if (this.$refs.forgotPassword.validate() === false) {
        self.$notify({
          title: 'Error',
          text: 'Your email is invalid!',
          duration: 3000,
          type: 'error'
        })
        return
      }
      self.disabled_ = true
      self.resetPassword(self.email)
      .then(() => {
        self.$notify({
          text: 'You have e-mailed your password reset link!',
          duration: 3000,
          type: 'success'
        })
        self.$router.push({name: 'Login'})
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          self.$notify({
            title: 'Error',
            text: 'Your email is invalid!',
            duration: 3000,
            type: 'error'
          })
        }
      })
      .finally(() => {
        self.disabled_ = false
      })
    }
  }
}
</script>

<style>

</style>