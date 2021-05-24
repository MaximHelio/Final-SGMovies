<template>
  <div class="carousel-item">
    <RecentMovieItem 
      class="poster"
      :src="item.poster" 
      v-for="item in movie" 
      :key="item.id"
      :movie="item"
    />
  </div>
</template>

<script>
import RecentMovieItem from '@/components/RecentMovieItem'

export default {
  name: 'RecentMovieCarouselRow',
  components : {
    RecentMovieItem,
  },
  props: {
    movie: {
      type: Array,
      required: true,
    }
  },
}
</script>