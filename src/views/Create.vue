<template>
  <div class="create">
    <h2>Add a New Blog</h2>
    <form>
      <label>Blog Title:</label>
      <input
        type="text"
        required
        v-model="title"
        placeholder="Title"
      />
      <label>Blog Title:</label>
      <textarea
        type="text"
        required
        v-model="body"
        placeholder="Body"
      />
      <button :disabled="disabled_" @click.prevent="_createNewBlog()">Add Blog</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      title: '',
      body: '',
      disabled_: false
    }
  },
  methods: {
    ...mapActions(['createNewBlog']),
    _createNewBlog() {
      let self = this
      if (self.body === '' || self.title === '') {
        self.$notify({
          title: '',
          text: 'Title and body cannot be blank!',
          duration: 3000,
          type: 'error'
        })
        return
      }
      self.disabled_ = true
      this.createNewBlog({body: this.body, title: this.title})
      .then(() => {
        self.title = ''
        self.body = ''
        self.$notify({
          title: '',
          text: 'Blog Successfully Created!',
          duration: 3000,
          type: 'success'
        })
        self.$router.push({name: 'Home'})
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        self.disabled = false
      })
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>