<template>
<div>
  <div class="modal-body comment-page d-flex justify-content-between align-items-center">
    <div class="w-25 text-left">
      <p>평점: {{ movie.vote_average }}</p>
      <p>개봉일: {{ movie.release_date }}</p>
      <p>런타임: {{ movie.runtime }}</p>
      <p>댓글 수: {{ getCommentList.length }}</p>
    </div>
    <div class="row row-cols-2 w-75">
      <div
        class="col mt-4" 
        v-for="comment in getCommentList"
        :key="comment.id"
      >
        <h1>{{ comment.username }}</h1>
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
  <v-pagination
    v-model="page"
    :length="15"
    :total-visible="7"
    class="mt-5"
    @click="getNextPage"
  ></v-pagination>
</div>

</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    getCommentList() {
      return this.$store.getters.getMovieCommentList
    },
  },
  props: {
    movie: {
      type:Object,
    }
  },
  methods: {
    getNextPage() {
      console.log(this.page)
    }
  }
}
</script>

<style>

</style>