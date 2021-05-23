<template>
  <div>
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
      <div class="carousel-inner">
        <RecentMovieItem
          v-for="(movie, index) in latestMovieList"
          :key="index"
          :index="index"
          :movie="movie"
          :class="index == 0 ? 'active' : ''"
        />
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div>
      asdasdasd
    </div>
  </div>
</template>

<script>
import RecentMovieItem from '@/components/RecentMovieItem'

export default {
  name: 'RecentMovieCarousel',
  components: {
    RecentMovieItem,
  },
  computed: {
    latestMovieList() {
      return this.$store.getters.getLatestMovieList
    }
  },
}
</script>