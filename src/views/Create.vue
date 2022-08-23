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
      <button @click.prevent="_createNewBlog()">Add Blog</button>
      <v-snackbar
      v-model="toast"
      top
      right
      :timeout="1000"
      color="#f1356d"
      width="auto"
      >
      Blog Successfully Created!
      </v-snackbar>
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
      toast: false
    }
  },
  methods: {
    ...mapActions(['getUserBlogs','createNewBlog']),
    _createNewBlog() {
      let self = this
      this.createNewBlog({body: this.body, title: this.title})
      .then(() => {
        self.toast = true
        self.title = ''
        self.body = ''
      })
    }
  },
  mounted () {
    this.getUserBlogs()
  }
}
</script>

<style>

</style>