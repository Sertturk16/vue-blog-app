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
      <label>Author:</label>
      <input
        type="text"
        required
        v-model="title"
        placeholder="Author"
      />
      <button >Add Blog</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      body: '',
      author: ''
    }
  }
}
</script>

<style>

</style>