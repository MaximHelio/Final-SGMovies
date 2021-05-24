<template>
  <div>
    <img class="poster poster:hover"
      v-for="movie in movieList"
      :src="movie.poster" :key="movie.pk"
      @click="foldingLatestArea"
    >
  </div>
</template>

<script>
export default {
  name: 'RecentMovieItem',
  props: {
    movieList: {
      type: Array,
      required: true,
    }
  },
  methods : {
    foldingLatestArea () {
      this.$store.commit('SET_LATEST_LAYER', this.movie)
    }
  }
}
</script>

<style scoped>
img.poster {
  width: 25%;
  height: 350px;
  object-fit: cover;
  cursor: pointer;
  transition: 0.3s;
}

img.poster:hover {
  transform: scale(1.1);
}
</style>