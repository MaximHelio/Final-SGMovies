<template>
  <div class="container">
    <MovieCarousel />
    <RecentMovie />
    <MovieList />
    <Movie />
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel'
import MovieList from '@/components/MovieList'
import RecentMovie from '@/components/RecentMovie'
import Movie from '@/components/Movie'

export default {
  name: 'MovieView',
  components: {
    MovieCarousel,
    MovieList,
    RecentMovie,
    Movie
  },
  created() {
    this.$store.dispatch('GET_MOVIE_LIST')
    this.$store.dispatch('GET_LATEST_MOVIE_LIST')
    this.$store.dispatch('GET_BEST_MOVIE_LIST')
  },
}
</script>

<style>

</style>