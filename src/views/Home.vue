<template>
  <div class="home">
    <BlogList v-if="blogs.length > 0" title="All Blogs" :blogs="blogs"></BlogList>
    <BlogList v-if="$user.get().role === 'user' && user_blogs.length > 0" title="My Blogs" :blogs="user_blogs"></BlogList>
    <div v-if="blogs.length === 0 && user_blogs.length === 0">There is no blog yet...</div>
  </div>
</template>

<script>
import BlogList from '@/components/Blog/BlogList.vue';
import { mapActions, mapState } from 'vuex';
export default {
  components: { BlogList },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      blogs: state => state.blog.blogs,
      user_blogs: state => state.blog.user_blogs
    })
  },
  methods: {
    ...mapActions(['getAllBlogs', 'getUserBlogs'])
  },
  created () {
    this.getAllBlogs()
    if (this.$user.get().role === 'user') {
      this.getUserBlogs()
    }
  }
}
</script>