<template>
  <div class="d-inline-block">
    <RecentMovieItemImg
      class="poster poster:hover"
      v-for="movie in movieList"
      :src="movie.poster" :key="movie.pk"
      @click="foldingLatestArea"
      :movie="movie"
    />
  </div>
</template>

<script>
import RecentMovieItemImg from '@/components/RecentMovieItemImg'

export default {
  name: 'RecentMovieItem',
  components: {
    RecentMovieItemImg,
  },
  props: {
    movieList: {
      type: Array,
      required: true,
    }
  },
  methods : {
    foldingLatestArea () {
      this.$store.commit('SET_LATEST_LAYER', this.movie)
      // this.$emit('select-movie', /)
    }
  }
}
</script>

<style scoped>
img.poster {
  width: 25%;
  height: 410px;
  object-fit: cover;
  cursor: pointer;
  transition: 0.3s;
}

img.poster:hover {
  transform: scale(1.1);
}
</style>