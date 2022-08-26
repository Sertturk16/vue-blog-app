<template>
  <div class="home">
    <BlogList v-if="blogs.length > 0 && $user.get().role === 'guest'" title="All Blogs" :blogs="blogs"></BlogList>
    <BlogList v-if="$user.get().role === 'user' && userBlogs.length > 0" title="My Blogs" :blogs="userBlogs"></BlogList>
    <BlogList v-if="$user.get().role === 'user' && filteredBlogs.length > 0" title="Other Blogs" :blogs="filteredBlogs"></BlogList>
    <div v-if="blogs.length === 0 && userBlogs.length === 0">There is no blog yet...</div>
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
      user: state => state.session.user
    }),
    filteredBlogs () {
      if (this.$user.get().role === 'user' && this.user !== null) {
        return this.blogs.filter(item => item.user_id !== this.user.id)
      } else {
        return []
      }
    },
    userBlogs () {
      if (this.$user.get().role === 'user' && this.user !== null) {
        return this.blogs.filter(item => item.user_id === this.user.id)
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions(['getAllBlogs'])
  },
  mounted () {
    this.getAllBlogs()
  }
}
</script>