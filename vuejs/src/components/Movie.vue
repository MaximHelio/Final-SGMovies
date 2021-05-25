<template>
  <div>
    <nav class="mt-5 align-items-center">
      <div class="me-5">
        <span class="fs-3 fw-bold">베스트 영화</span>
      </div>
    </nav>

    <MovieCarousel />
      
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel'

export default {
  name: 'Movie',
  components: {
    MovieCarousel,
  },
  created() {
    this.$store.dispatch('GET_BEST_MOVIE_LIST')
  },
}
</script>

