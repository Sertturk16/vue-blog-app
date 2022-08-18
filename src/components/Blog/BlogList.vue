<template>
  <div class="home">
    <h2>{{title}}</h2>
    <div class="blog-preview" v-for="blog in blogs" :key="blog.id">
      <router-link :to='`/blogs/${blog.id}`'>
        <h2>{{blog.title}}</h2>
      </router-link>
      <p>Written by {{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'blogs']
}
</script>