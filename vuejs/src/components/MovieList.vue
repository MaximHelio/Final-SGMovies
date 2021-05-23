<template>
  <div>
    <nav class="d-flex mt-5 align-items-center">
      <div class="me-5">
        <span class="fs-3 fw-bold">기타 영화</span>
      </div>
      <div class="filter">
        <span :class="{ pick: state == 1 }" @click=all>전체</span>
        <span :class="{ pick: state == 2 }" @click=action>액션</span>
        <span :class="{ pick: state == 3 }" @click=comedy>코미디</span>
        <span :class="{ pick: state == 4 }" @click=horror>공포</span>
        <span :class="{ pick: state == 5 }" @click=animation>애니메이션</span>
        <span :class="{ pick: state == 6 }" @click=sf>SF</span>
      </div>
    </nav>
    <div class="row row-cols-4">
      <MovieListItem
        v-for="movie in movieList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  data() {
    return {
      state: 1,
    }
  },
  computed: {
    movieList() {
      console.log("Z")
      return this.$store.getters.getMovieList
    }
  },
  methods: {
    all() {
      this.state = 1
    },
    action() {
      this.state = 2
    },
    comedy() {
      this.state = 3
    },
    horror() {
      this.state = 4
    },
    animation() {
      this.state = 5
    },
    sf() {
      this.state = 6
    },
    checkBottom() {
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement
      if (scrollHeight - scrollTop === clientHeight) {
        this.$store.dispatch('GET_MOVIE_LIST')
      }
    }
  },
  created() {
    this.$store.dispatch('GET_MOVIE_LIST')
    document.addEventListener('scroll', this.checkBottom)
  },
}
</script>

<style>
  nav span {
    color: white;
  }
  .filter span {
    margin-right: 15px;
    cursor: pointer;
  }

  .filter span:hover {
    text-shadow: 0 0 5px yellow;
    font-size: 17px;
  }

  .pick {
    color: yellow;
    font-size: 17px;
  }
</style>