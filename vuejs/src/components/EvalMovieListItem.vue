<template>
  <div>
    <div class="col my-4" id="">
      <div class="movie" @click="chkMovie">
        <img class="w-75 border" :src="movie.poster" alt="">
        <span class="mt-3">{{ movie.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EvalMovieListItem',
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    chkMovie() {
      const movie_id = this.movie.id
      this.$store.dispatch('CHECK_MOVIE', movie_id)
    },
  }
}
</script>

<style scoped>

</style>