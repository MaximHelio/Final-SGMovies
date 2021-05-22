<template>
  <div>
    <nav class="d-flex mt-5 align-items-center">
      <div class="me-5">
        <span class="fs-3 fw-bold">최신 영화</span>
      </div>
    </nav>
    <RecentMovieItem />
  </div>
</template>

<script>
import RecentMovieItem from '@/components/RecentMovieItem'

export default {
  name: 'RecentMovie',
  components: {
    RecentMovieItem,
  },
}
</script>

<style>

</style>