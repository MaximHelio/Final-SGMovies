<template>
  <div>
    <div id="carousel-control" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
      <div class="carousel-inner">
        <RecentMovieItem
          class="carousel-item"
          v-for="(movieList, index) in latestMovieList" :key="index"          
          :movieList="movieList"
          :class="index == 0 ? 'active' : ''"
        />
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel-control" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel-control" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <LatestArea />
  </div>
</template>

<script>
import RecentMovieItem from '@/components/RecentMovieItem'
import LatestArea from '@/components/LatestArea'

export default {
  name: 'RecentMovieCarousel',
  components: {
    RecentMovieItem,
    LatestArea,
  },
  computed: {
    latestMovieList() {
      return this.$store.getters.getLatestMovieList
    }
  },
}
</script>

<style scoped>
.latest-icon-area {
    text-align: left;
    padding: 20px 30px;
    position: absolute;
}

.latest-tab-area {
    padding-top: 65px;
    display: none;
}

.latest-tab-area.active {
  display: block;
}

i[data-tab-id] {
    font-size: 22px;
    margin: 0 5px;
    cursor: pointer;
}

i[data-tab-id].active {
    color: #efb738;
}

h3.info-title {
    text-align: left;
}

.info-left {padding: 30px;font-size: 16px;color: white;text-align: left;
  min-width: 800px;
  width: 80%;
  display: inline-block;
  vertical-align: top;
  height: 250px;
}

.info-right{
  width: 20%;
  min-width: 0;
  display: inline-block;
  font-size: 0;
  vertical-align: top;
  height: 250px;
  background-size: auto 100% !important;
  background-repeat: no-repeat !important;
}

h3.info-title {
    font-size: 40px;
    font-weight: 700;
    color: #6ea41b;
}

span.info-genre {
    font-size: 18px;
    color: white;
}

.info-rating {
    text-align: left;
    display: inline-block;
    border: 1px solid #DDD;
}

span.rating-label {
    border-right: 1px solid #DDD;
    padding: 0 10px;
    display: inline-block;
    background: #999;
}

span.rating-value {
    padding: 0 10px;
    display: inline-block;
}
.latest-area {
    border-bottom: 1px solid #333;
    padding-bottom: 30px;
    display: none;
}

.latest-area.active {
  display: block;
}
</style>