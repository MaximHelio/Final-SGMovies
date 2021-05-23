<template>
  <div class="carousel-item">
    <img class="poster" :src="item.poster"  v-for="item in movie" :key="item.id">
  </div>
</template>

<script>
export default {
  name: 'RecentMovieItem',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
}

console.log(this)
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