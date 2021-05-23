<template>
  <div>
    <nav class="d-flex mt-5 align-items-center">
      <div class="me-5">
        <span class="fs-3 fw-bold">최신 영화</span>
      </div>
    </nav>
    <RecentMovieCarousel />
  </div>
</template>

<script>
import RecentMovieCarousel from '@/components/RecentMovieCarousel'

export default {
  name: 'RecentMovie',
  components: {
    RecentMovieCarousel,
  },
}
</script>

<style>

</style>