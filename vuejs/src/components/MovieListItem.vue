<template>
  <div>
    <div class="col my-4 accordion" id="accordionExample">
      <div class="movie collapsed" data-bs-toggle="collapse" :data-bs-target="`#id-${movie.id}`">
        <img class="w-75" :src="movie.poster" alt="">
        <span class="mt-3">{{ movie.title }}</span>
      </div>
      <div :id="`id-${movie.id}`" class="accordion-collapse collapse mt-4">
        <div class="boxx"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style>
  .movie {
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(165, 165, 165);
  }
  .movie:hover {
    box-shadow: 0 0 5px white;
    transform: scale(1.1);
  }

  .boxx {
    width: 1000px;
    height: 100px;
    background-color: orange;
  }
</style>