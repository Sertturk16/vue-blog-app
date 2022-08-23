<template>
  <div class="blog-details">
    <article v-if="requestCompleted">
      <h2>{{blog.title}}</h2>
      <p>Written by {{blog.author}}</p>
      <div>{{blog.body}}</div>
      <button class="dojo-btn" v-if="visibleDelete" @click="dialog = true">Delete</button>
    </article>
    <v-dialog
      v-model="dialog"
      width="auto"
      class="m-3"
    >
        <v-card>
          <v-card-title>
            Are you sure you want do delete this blog?
          </v-card-title>
          <v-card-actions>
            <button class="dojo-btn ml-auto" @click="_deleteBlog()">Delete</button>
            <button class="dojo-btn dojo-btn-white" @click="dialog = false">Cancel</button>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      requestCompleted: false,
      dialog: false
    }
  },
  computed: {
    ...mapState({
      blog: state => state.blog.blogDetail
    }),
    visibleDelete () {
      return this.blog.user_id === JSON.parse(localStorage.getItem('user')).id
    }
  },
  methods: {
    ...mapActions(['getBlogDetail', 'deleteBlog']),
    _deleteBlog () {
      let self = this
      this.deleteBlog(this.blog.id)
      .then(() => {
        self.$router.push({name: 'Home'})        
      })
    }
  },
  created () {
    this.getBlogDetail(this.$route.params.id)
    .then(() => {
      this.requestCompleted = true
    })
  }
}
</script>