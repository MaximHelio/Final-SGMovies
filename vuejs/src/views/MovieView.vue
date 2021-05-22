<template>
  <div class="container">
    <MovieCarousel />
    <RecentMovie />
    <MovieList />
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel'
import MovieList from '@/components/MovieList'
import RecentMovie from '@/components/RecentMovie'

export default {
  name: 'MovieView',
  components: {
    MovieCarousel,
    MovieList,
    RecentMovie,
  },
  created() {
    this.$store.dispatch('GET_MOVIE_LIST')
  },
}
</script>

<style>

</style>