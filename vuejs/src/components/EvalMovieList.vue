<template>
  <div class="row row-cols-4">
    <EvalMovieListItem
      v-for="movie in movieList"
      :key="movie.pk"
      :movie=movie
    />
  </div>
</template>

<script>
import _ from 'lodash'
import EvalMovieListItem from '@/components/EvalMovieListItem'

export default {
  name: 'EvalMovieList',
  components: {
    EvalMovieListItem
  },
  computed: {
    movieList() {
      return this.$store.getters.getMovieList
    },
  },
  methods: {
    checkBottom() {
        console.log('scroll!!!')
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement
        if (scrollHeight - scrollTop === clientHeight) {
          this.$store.dispatch('GET_MOVIE_LIST')
        }
    },
  },
  created() {
    this.$store.dispatch('GET_MOVIE_LIST')
    document.addEventListener('scroll', _.throttle(this.checkBottom,500))
  },
}
</script>

<style>

</style>